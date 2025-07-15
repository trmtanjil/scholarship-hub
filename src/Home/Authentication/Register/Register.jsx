import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxios from '../../../hoocks/useAxios';
import useAuth from '../../../hoocks/useAuth';
import toast, { Toaster } from 'react-hot-toast';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [profilepic, setProfilePic] = useState();
  const { cratUser, userProfileUpdate } = useAuth();
  const axiosInstance = useAxios();
  const navigate =useNavigate()
  const location =useLocation()
    const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      // Custom password validation
      const password = data.password;
      if (password.length < 6) {
        return toast.error('Password must be at least 6 characters');
      }
      if (!/[A-Z]/.test(password)) {
        return toast.error('Password must contain at least one capital letter');
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return toast.error('Password must contain at least one special character');
      }

      // Firebase create user
      const result = await cratUser(data.email, password);
      console.log(result.user);

      const userInfo = {
        email: data.email,
        role: 'user',
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      const userRes = await axiosInstance.post('/users', userInfo);
      console.log(userRes.data);

      // Profile update
      await userProfileUpdate({
        displayName: data.name,
        photoURL: profilepic,
      });

      toast.success('Registration successful!');
        navigate(location?.state || '/');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Registration failed');
    }
  };

  const handleImageUploaded = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      setProfilePic(res.data.data.url);
      toast.success('Image uploaded!');
    } catch (err) {
      toast.error('Image upload failed!',err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4 p-5 rounded-2xl">
      <Toaster position="top-center" />
      <div className="bg-base-100 p-8 rounded-xl shadow-lg w-full max-w-md text-center space-y-5">
        <h2 className="text-3xl font-bold text-primary">Create an Account</h2>
        <p className="text-gray-500">Register with ScholarHub</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          {/* Name */}
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

          {/* Email */}
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

          {/* Password */}
               <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register('password', { required: true, minLength: 6 })}
              className="input input-bordered w-full pr-12"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Upload Photo</label>
            <input
              onChange={handleImageUploaded}
              type="file"
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn w-full bg-lime-300 hover:bg-lime-400 text-black font-semibold"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 font-medium btn-link">
            Login
          </Link>
        </p>

        {/* Social Login */}
        <SocialLogin />
      </div>
    </div>
  );
};

export default RegisterForm;
