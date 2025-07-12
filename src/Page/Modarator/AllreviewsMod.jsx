import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hoocks/useAxiosSecure";
import Swal from "sweetalert2";

const AllreviewsMod = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/reviews/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["allReviews"]);
      Swal.fire("Deleted!", "Review deleted successfully.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete review.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">All Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="border p-4 rounded-lg shadow hover:shadow-md transition duration-200 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={review.userImage}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{review.userName}</p>
                <p className="text-sm text-gray-500">{review.userEmail}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Scholarship:</span>{" "}
              {review.scholarshipName}
            </p>

            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">University:</span>{" "}
              {review.universityName}
            </p>

            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Rating:</span> {review.rating} ⭐
            </p>

            <p className="text-sm text-gray-700 italic mt-1">“{review.comment}”</p>

            <p className="text-xs text-right text-gray-400 mt-2">
              {new Date(review.reviewDate).toLocaleDateString()}
            </p>

            {/* Delete Button inside each review card */}
            <button
              onClick={() => handleDelete(review._id)}
              className="mt-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition self-start"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllreviewsMod;
