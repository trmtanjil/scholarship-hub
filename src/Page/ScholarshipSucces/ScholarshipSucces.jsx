import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../hoocks/useAuth';
import useAxiosSecure from '../../hoocks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

const ScholarshipSucces = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { scholarId } = useParams();

  // ✅ Get Scholarship Data by ID
  const { data: scholarship = {}, isLoading } = useQuery({
    queryKey: ['scholarship', scholarId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${scholarId}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    const applicationData = {
      ...data,
      userName: user.displayName,
      userEmail: user.email,
      userId: user._id || 'user-id',  // আপনার ইউজার কালেকশন থেকে আনতে হবে
      scholarshipId: scholarship?._id,
      universityName: scholarship?.universityName,
      category: scholarship?.scholarshipCategory,
      subject: scholarship?.subjectCategory,
      appliedDate: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post('/applied-scholarships', applicationData);
      if (res.data.insertedId) {
        Swal.fire('✅ Application Successful', 'Your scholarship application has been submitted.', 'success');
        reset();
      }
    } catch (error) {
      Swal.fire('❌ Submission Failed', error.message, 'error');
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Apply for: {scholarship.scholarshipName}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">

        {/* Phone Number */}
        <input {...register('phone', { required: true })} placeholder="Phone Number" className="input input-bordered w-full" />
        {errors.phone && <span className="text-red-500 text-sm">Phone number is required</span>}

        {/* Photo URL */}
        <input {...register('photo', { required: true })} placeholder="Photo URL" className="input input-bordered w-full" />
        {errors.photo && <span className="text-red-500 text-sm">Photo URL is required</span>}

        {/* Address */}
        <input {...register('address', { required: true })} placeholder="Address" className="input input-bordered w-full" />
        {errors.address && <span className="text-red-500 text-sm">Address is required</span>}

        {/* Gender */}
        <select {...register('gender', { required: true })} className="input input-bordered w-full">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <span className="text-red-500 text-sm">Gender is required</span>}

        {/* Degree */}
        <select {...register('degree', { required: true })} className="input input-bordered w-full">
          <option value="">Select Degree</option>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
        </select>
        {errors.degree && <span className="text-red-500 text-sm">Degree is required</span>}

        {/* SSC & HSC */}
        <input {...register('sscResult', { required: true })} placeholder="SSC Result (GPA)" className="input input-bordered w-full" />
        {errors.sscResult && <span className="text-red-500 text-sm">SSC Result is required</span>}

        <input {...register('hscResult', { required: true })} placeholder="HSC Result (GPA)" className="input input-bordered w-full" />
        {errors.hscResult && <span className="text-red-500 text-sm">HSC Result is required</span>}

        {/* Study Gap */}
        <select {...register('studyGap')} className="input input-bordered w-full">
          <option value="">Study Gap (Optional)</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {/* ✅ Read-only Fields */}
        <input type="text" value={scholarship?.universityName || ''} readOnly className="input input-bordered w-full bg-gray-100 text-black" />
        <input type="text" value={scholarship?.scholarshipCategory || ''} readOnly className="input input-bordered w-full bg-gray-100 text-black" />
        <input type="text" value={scholarship?.subjectCategory || ''} readOnly className="input input-bordered w-full bg-gray-100 text-black" />

        <button type="submit" className="btn bg-blue-600 text-white w-full">Submit / Apply</button>
      </form>
    </div>
  );
};

export default ScholarshipSucces;
