import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../hoocks/useAxiosSecure';
import Swal from 'sweetalert2';

const EditApplication = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // ✅ Load existing application data by ID
  useEffect(() => {
    const fetchApplication = async () => {
      const res = await axiosSecure.get(`/applied-scholarships/${id}`);
      reset(res.data);
      console.log(res.data);
    };
    fetchApplication();
  }, [axiosSecure, id, reset]);

  // ✅ Submit updated application
  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(`/applied-scholarships/${id}`, data);
      if (res.data.modifiedCount > 0) {
        Swal.fire('✅ Success', 'Application updated successfully!', 'success');
        navigate('/userdashboard/my-applications');
      }
    } catch (error) {
      Swal.fire('❌ Error', 'Failed to update application', 'error',error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10 w-[90%] lg:w-[80%]">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">✏️ Edit Your Scholarship Application</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Phone Number */}
        <div>
          <input {...register('phone', { required: true })} placeholder="Phone Number" className="input input-bordered w-full" />
          {errors.phone && <span className="text-red-500 text-sm">Phone number is required</span>}
        </div>

        {/* Address */}
        <div>
          <input {...register('address', { required: true })} placeholder="Address" className="input input-bordered w-full" />
          {errors.address && <span className="text-red-500 text-sm">Address is required</span>}
        </div>

        {/* Gender */}
        <div>
          <select {...register('gender', { required: true })} className="input input-bordered w-full">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <span className="text-red-500 text-sm">Gender is required</span>}
        </div>

        {/* Degree */}
        <div>
          <select {...register('degree', { required: true })} className="input input-bordered w-full">
            <option value="">Select Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
          {errors.degree && <span className="text-red-500 text-sm">Degree is required</span>}
        </div>

        {/* SSC Result */}
        <div>
          <input {...register('sscResult', { required: true })} placeholder="SSC Result (GPA)" className="input input-bordered w-full" />
          {errors.sscResult && <span className="text-red-500 text-sm">SSC Result is required</span>}
        </div>

        {/* HSC Result */}
        <div>
          <input {...register('hscResult', { required: true })} placeholder="HSC Result (GPA)" className="input input-bordered w-full" />
          {errors.hscResult && <span className="text-red-500 text-sm">HSC Result is required</span>}
        </div>

        {/* Study Gap */}
        <div>
          <select {...register('studyGap')} className="input input-bordered w-full">
            <option value="">Study Gap (Optional)</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Read-only University Name */}
        <div>
          <input {...register('universityName')} readOnly className="input input-bordered w-full bg-gray-100 text-black" />
        </div>

        {/* Read-only Scholarship Category */}
        <div>
          <input {...register('category')} readOnly className="input input-bordered w-full bg-gray-100 text-black" />
        </div>

        {/* Read-only Subject */}
        <div>
          <input {...register('subject')} readOnly className="input input-bordered w-full bg-gray-100 text-black" />
        </div>
      </form>

      <div className="mt-8">
        <button type="submit" onClick={handleSubmit(onSubmit)} className="btn bg-blue-600 hover:bg-blue-700 text-white w-full md:w-1/2 mx-auto block rounded-xl">
          ✅ Update Application
        </button>
      </div>
    </div>
  );
};

export default EditApplication;
