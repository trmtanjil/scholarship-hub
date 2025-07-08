import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const A_M_AddScholarship = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [universityImage, setUniversityImage] = useState('');

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      setUniversityImage(res.data.data.url);
      Swal.fire('Success', 'Image uploaded successfully!', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Image upload failed!', 'error');
    }
  };

  const onSubmit = (data) => {
    if (!universityImage) {
      Swal.fire('Error', 'Please upload university image!', 'error');
      return;
    }

    const scholarshipData = {
      ...data,
      universityImage: universityImage,
    };

    console.log('Scholarship Data:', scholarshipData);
    Swal.fire('Success', 'Scholarship submitted successfully!', 'success');
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl text-gray-700 shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Add Scholarship</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label>Scholarship Name</label>
          <input {...register('scholarshipName', { required: true })} type="text" placeholder="Scholarship Name" className="input input-bordered w-full" />
          {errors.scholarshipName && <p className="text-red-500">Scholarship Name is required</p>}
        </div>

        <div>
          <label>University Name</label>
          <input {...register('universityName', { required: true })} type="text" placeholder="University Name" className="input input-bordered w-full" />
          {errors.universityName && <p className="text-red-500">University Name is required</p>}
        </div>

        <div>
          <label>University Logo/Image</label>
          <input onChange={handleImageUpload} type="file" className="file-input file-input-bordered w-full" />
        </div>

        <div>
          <label>University Country</label>
          <input {...register('universityCountry', { required: true })} type="text" placeholder="Country" className="input input-bordered w-full" />
        </div>

        <div>
          <label>University City</label>
          <input {...register('universityCity', { required: true })} type="text" placeholder="City" className="input input-bordered w-full" />
        </div>

        <div>
          <label>University World Rank</label>
          <input {...register('worldRank', { required: true })} type="number" placeholder="World Rank" className="input input-bordered w-full" />
        </div>

        <div>
          <label>Subject Category</label>
          <select {...register('subjectCategory', { required: true })} className="select select-bordered w-full">
            <option value="">Select Category</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Engineering">Engineering</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>

        <div>
          <label>Scholarship Category</label>
          <select {...register('scholarshipCategory', { required: true })} className="select select-bordered w-full">
            <option value="">Select Scholarship Type</option>
            <option value="Full fund">Full fund</option>
            <option value="Partial">Partial</option>
            <option value="Self-fund">Self-fund</option>
          </select>
        </div>

        <div>
          <label>Degree</label>
          <select {...register('degree', { required: true })} className="select select-bordered w-full">
            <option value="">Select Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>

        <div>
          <label>Tuition Fees (Optional)</label>
          <input {...register('tuitionFees')} type="number" placeholder="Tuition Fees" className="input input-bordered w-full" />
        </div>

        <div>
          <label>Application Fees</label>
          <input {...register('applicationFees', { required: true })} type="number" placeholder="Application Fees" className="input input-bordered w-full" />
        </div>

        <div>
          <label>Service Charge</label>
          <input {...register('serviceCharge', { required: true })} type="number" placeholder="Service Charge" className="input input-bordered w-full" />
        </div>

        <div>
          <label>Application Deadline</label>
          <input {...register('deadline', { required: true })} type="date" className="input input-bordered w-full" />
        </div>

        <div>
          <label>Scholarship Post Date</label>
          <input {...register('postDate', { required: true })} type="date" className="input input-bordered w-full" />
        </div>

        <div className="md:col-span-2">
          <label>Posted User Email</label>
          <input {...register('postedBy', { required: true })} type="email" placeholder="Posted By Email" className="input input-bordered w-full" />
        </div>

        <div className="md:col-span-2 text-center mt-4">
          <button type="submit" className="btn btn-success w-full">Submit Scholarship</button>
        </div>

      </form>
    </div>
  );
};

export default A_M_AddScholarship;
