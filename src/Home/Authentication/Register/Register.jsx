import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';  // ✅ Correct import
import axios from 'axios';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hoocks/useAuth';
import useAxios from '../../../hoocks/useAxios';

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [profilepic, setProfilePic] = useState();
  const { cratUser, userProfileUpdate } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // ✅ Step 1: Create user
      const result = await cratUser(data.email, data.password);
      const firebaseUser = result.user;
      console.log('User created:', firebaseUser);

      // ✅ Step 2: Update Firebase profile
      const profile = {
        displayName: data.name,
        photoURL: profilepic,
      };
      await userProfileUpdate(profile);

      // ✅ Step 3: Save to your Database
      const userInfo = {
        name: data.name,
        email: data.email,
        role: 'user',
        photoURL: profilepic,
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };
      await axiosInstance.post('/users', userInfo);

      console.log('User profile updated & saved to DB');

      // ✅ Step 4: Redirect to home or dashboard
      navigate('/dashboard/myprofile');
    } catch (error) {
      console.error('Registration Error:', error);
    }
  };

  const handleImageUploaded = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`;
    const res = await axios.post(imageUploadUrl, formData);
    setProfilePic(res.data.data.url);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4 p-5 rounded-2xl">
      <div className="bg-base-100 p-8 rounded-xl shadow-lg w-full max-w-md text-center space-y-5">
        <h2 className="text-3xl font-bold text-primary">Create an Account</h2>
        <p className="text-gray-500">Register with Profast</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Upload Photo</label>
            <input
              onChange={handleImageUploaded}
              type="file"
              className="file-input file-input-bordered w-full"
            />
          </div>

          <button
            type="submit"
            className="btn w-full bg-lime-300 hover:bg-lime-400 text-black font-semibold"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 font-medium btn-link">
            Login
          </Link>
        </p>

        <SocialLogin />
      </div>
    </div>
  );
};

export default RegisterForm;
