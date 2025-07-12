import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../hoocks/useAxiosSecure";

const EditScholar = ({ scholarship, onClose, refetch }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();
  const [universityImage, setUniversityImage] = useState(scholarship.universityImage || "");

  useEffect(() => {
    reset(scholarship);
  }, [scholarship, reset]);

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`;

    try {
      const res = await axios.post(uploadUrl, formData);
      setUniversityImage(res.data.data.url);
      Swal.fire("Success", "Image uploaded successfully!", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to upload image!", "error");
    }
  };

 const onSubmit = async (data) => {
  const updatedData = { ...data, universityImage };

  try {
    const res = await axiosSecure.put(`/scholarships/${scholarship._id}`, updatedData);
    console.log("✅ API Response:", res.data); // 🔍 Debug log

    if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
      Swal.fire({
        title: "Success!",
        text: "Scholarship updated successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
      onClose();
    } else {
      Swal.fire("Info", "No changes were detected.", "info");
    }
  } catch (err) {
    console.error("❌ Update Error:", err); // 🔍 Exact Error Log
    Swal.fire("Error", "Failed to update scholarship!", "error");
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
      <div className="max-w-6xl w-full mx-auto p-4 bg-white rounded-xl text-gray-700 shadow-lg overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold">✏️ Edit Scholarship</h2>
          <button onClick={onClose} className="btn btn-circle btn-sm">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {/* Scholarship Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Scholarship Name</span>
            </label>
            <input 
              {...register('scholarshipName', { required: "Scholarship name is required" })} 
              type="text" 
              className="input input-bordered w-full" 
            />
            {errors.scholarshipName && <span className="text-red-500 text-xs">{errors.scholarshipName.message}</span>}
          </div>

          {/* University Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">University Name</span>
            </label>
            <input 
              {...register('universityName', { required: "University name is required" })} 
              type="text" 
              className="input input-bordered w-full" 
            />
            {errors.universityName && <span className="text-red-500 text-xs">{errors.universityName.message}</span>}
          </div>

          {/* Image Upload */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-medium">University Logo/Image</span>
            </label>
            <input 
              onChange={handleImageUpload} 
              type="file" 
              className="file-input file-input-bordered w-full" 
              accept="image/*"
            />
            {universityImage && (
              <div className="mt-2">
                <img src={universityImage} alt="University" className="h-20 object-contain" />
              </div>
            )}
          </div>

          {/* University Country */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">University Country</span>
            </label>
            <input 
              {...register('universityCountry', { required: "Country is required" })} 
              type="text" 
              className="input input-bordered w-full" 
            />
            {errors.universityCountry && <span className="text-red-500 text-xs">{errors.universityCountry.message}</span>}
          </div>

          {/* University City */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">University City</span>
            </label>
            <input 
              {...register('universityCity', { required: "City is required" })} 
              type="text" 
              className="input input-bordered w-full" 
            />
            {errors.universityCity && <span className="text-red-500 text-xs">{errors.universityCity.message}</span>}
          </div>

          {/* World Rank */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">University World Rank</span>
            </label>
            <input 
              {...register('worldRank', { required: "Rank is required" })} 
              type="number" 
              className="input input-bordered w-full" 
            />
            {errors.worldRank && <span className="text-red-500 text-xs">{errors.worldRank.message}</span>}
          </div>

          {/* Subject Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Subject Category</span>
            </label>
            <select 
              {...register('subjectCategory', { required: "Category is required" })} 
              className="select select-bordered w-full"
            >
              <option value="">Select Category</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Engineering">Engineering</option>
              <option value="Doctor">Doctor</option>
            </select>
            {errors.subjectCategory && <span className="text-red-500 text-xs">{errors.subjectCategory.message}</span>}
          </div>

          {/* Scholarship Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Scholarship Category</span>
            </label>
            <select 
              {...register('scholarshipCategory', { required: "Scholarship category required" })} 
              className="select select-bordered w-full"
            >
              <option value="">Select Type</option>
              <option value="Full fund">Full fund</option>
              <option value="Partial">Partial</option>
              <option value="Self-fund">Self-fund</option>
            </select>
            {errors.scholarshipCategory && <span className="text-red-500 text-xs">{errors.scholarshipCategory.message}</span>}
          </div>

          {/* Degree */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Degree</span>
            </label>
            <select 
              {...register('degree', { required: "Degree is required" })} 
              className="select select-bordered w-full"
            >
              <option value="">Select Degree</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Masters">Masters</option>
            </select>
            {errors.degree && <span className="text-red-500 text-xs">{errors.degree.message}</span>}
          </div>

          {/* Tuition Fees */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Tuition Fees (Optional)</span>
            </label>
            <input 
              {...register('tuitionFees')} 
              type="number" 
              className="input input-bordered w-full" 
            />
          </div>

          {/* Application Fees */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Application Fees</span>
            </label>
            <input 
              {...register('applicationFees', { required: "Required" })} 
              type="number" 
              className="input input-bordered w-full" 
            />
            {errors.applicationFees && <span className="text-red-500 text-xs">{errors.applicationFees.message}</span>}
          </div>

          {/* Service Charge */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Service Charge</span>
            </label>
            <input 
              {...register('serviceCharge', { required: "Required" })} 
              type="number" 
              className="input input-bordered w-full" 
            />
            {errors.serviceCharge && <span className="text-red-500 text-xs">{errors.serviceCharge.message}</span>}
          </div>

          {/* Deadline */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Application Deadline</span>
            </label>
            <input 
              {...register('deadline', { required: "Required" })} 
              type="date" 
              className="input input-bordered w-full" 
            />
            {errors.deadline && <span className="text-red-500 text-xs">{errors.deadline.message}</span>}
          </div>

          {/* Post Date */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Scholarship Post Date</span>
            </label>
            <input 
              {...register('postDate', { required: "Required" })} 
              type="date" 
              className="input input-bordered w-full" 
            />
            {errors.postDate && <span className="text-red-500 text-xs">{errors.postDate.message}</span>}
          </div>

          {/* Posted By */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-medium">Posted User Email</span>
            </label>
            <input 
              {...register('postedBy', { required: "Email is required" })} 
              type="email" 
              className="input input-bordered w-full" 
            />
            {errors.postedBy && <span className="text-red-500 text-xs">{errors.postedBy.message}</span>}
          </div>

          {/* Buttons */}
          <div className="form-control md:col-span-2 mt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={onClose} 
                type="button" 
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-success flex-1"
              >
                Update Scholarship
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditScholar;