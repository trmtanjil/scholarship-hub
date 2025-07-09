import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hoocks/useAxiosSecure";
import useAuth from "../../hoocks/useAuth";
import LoadingId from "../Loading/Loading";
import ScholarshipSucces from "../ScholarshipSucces/ScholarshipSucces";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { scholarId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { isPending, data: parcelInfo = {}, refetch } = useQuery({
    queryKey: ["scholarships", scholarId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${scholarId}`);
      return res.data;
    },
  });

  if (isPending) {
    return <LoadingId></LoadingId>;
  }

  const amount = parcelInfo.applicationFees;
  const amountInCents = amount * 100;
  const isAlreadyPaid = parcelInfo.payment_status === 'paid' || paymentSuccess;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    console.log(paymentMethod);

    if (error) {
      setError(error.message);
      Swal.fire("\u274C Payment Error", error.message, "error");
      return;
    } else {
      setError("");
    }

    let clientSecret;
    try {
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        scholarId,
      });
      clientSecret = res.data.clientSecret;
    } catch (err) {
      Swal.fire("\u274C Payment Intent Error", err.response?.data?.message || "Failed to create payment intent", "error");
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });

    if (result.error) {
      setError(`Payment failed: ${result.error.message}`);
      Swal.fire("\u274C Payment Failed", result.error.message, "error");
    } else {
      setError("");
      if (result.paymentIntent.status === "succeeded") {
        const paymentData = {
          scholarId,
          email: user.email,
          amount,
          transactionId: result.paymentIntent.id,
          paymentMethod: result.paymentIntent.payment_method_types,
        };
        
        try {
          const paymentRes = await axiosSecure.post("/payments", paymentData);
          
           
          if (paymentRes.data.paymentId) {
            setPaymentSuccess(true);
            refetch();
            Swal.fire("\u2705 Payment Successful", "Thank you! Your payment is completed.", "success");
          }
        } catch (err) {
          Swal.fire("\u274C Payment Save Error", err.response?.data?.message || "Failed to save payment details", "error");
        }
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-gray-800 rounded-2xl shadow-lg text-white mt-10"
      >
        <div className="mb-4 text-sm">
          Payment Status:{" "}
          <span className={`font-bold ${isAlreadyPaid ? "text-green-400" : "text-red-400"}`}>
            {isAlreadyPaid ? "Paid" : "Unpaid"}
          </span>
        </div>

        <CardElement className="space-y-4 text-white border p-3 rounded-lg" />

        <button
          type="submit"
          className="w-full bg-blue-500 mt-5 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300 disabled:opacity-50"
          disabled={!stripe || isAlreadyPaid}
        >
          {isAlreadyPaid ? "Paid" : `Pay \u09F3${amount}`}
        </button>

        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>

      {/* ✅✅✅ Add this below the payment form to show application form after payment success */}

      {paymentSuccess && (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-700 rounded-2xl shadow-lg text-white">
          <h2 className="text-lg font-bold mb-4">Scholarship Application Form</h2>

          {/* Add your Application Form component or code here */}
          <ScholarshipSucces></ScholarshipSucces>
          
          <p className="text-sm mb-2">(✅ This is where your application form will go)</p>

        </div>
      )}

    </div>
  );
}

export default PaymentForm;