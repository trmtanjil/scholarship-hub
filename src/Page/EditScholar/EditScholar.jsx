import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hoocks/useAxiosSecure';

const EditScholarshipForm = ({ scholarship, onSubmit, onCancel }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [universityImage, setUniversityImage] = useState(scholarship.universityImage);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    reset(scholarship);
  }, [scholarship, reset]);

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`;

    try {
      const res = await axiosSecure.post(imageUploadUrl, formData);
      setUniversityImage(res.data.data.url);
      Swal.fire('Success', 'Image uploaded successfully!', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Image upload failed!', 'error');
    }
  };

  const handleFormSubmit = (data) => {
    const updatedData = {
      ...data,
      universityImage: universityImage || scholarship.universityImage,
      _id: scholarship._id, // Important for identifying the scholarship
    };
    onSubmit(updatedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label>Scholarship Name</label>
        <input {...register('scholarshipName', { required: true })} className="input input-bordered w-full" />
        {errors.scholarshipName && <p className="text-red-500">Required</p>}
      </div>

      <div>
        <label>University Name</label>
        <input {...register('universityName', { required: true })} className="input input-bordered w-full" />
        {errors.universityName && <p className="text-red-500">Required</p>}
      </div>

      <div>
        <label>Change University Logo (optional)</label>
        <input type="file" onChange={handleImageUpload} className="file-input file-input-bordered w-full" />
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
        <label>Degree</label>
        <select {...register('degree', { required: true })} className="select select-bordered w-full">
          <option value="">Select Degree</option>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
        </select>
      </div>

      <div>
        <label>Application Fees</label>
        <input {...register('applicationFees', { required: true })} type="number" className="input input-bordered w-full" />
      </div>

      <div className="flex gap-4">
        <button type="submit" className="btn btn-success flex-1">Update</button>
        <button type="button" onClick={onCancel} className="btn btn-error flex-1">Cancel</button>
      </div>
    </form>
  );
};

export default EditScholarshipForm;
