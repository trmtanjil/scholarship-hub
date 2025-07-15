import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hoocks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import Swal from 'sweetalert2';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { singIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    singIn(data.email, data.password)
      .then(result => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: ('Login Successful!',result) ,
          showConfirmButton: false,
          timer: 1500
        });
        navigate(from);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ('Your password is incorrect!',error),
        });
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <fieldset className="fieldset space-y-4">
          <h1 className='text-3xl font-bold text-center'>Lgin Scholar</h1>

          {/* Email Field */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {errors.email?.type === 'required' && (
            <p className='text-red-500'>Email is required</p>
          )}

          {/* Password Field with Toggle */}
          <label className="label">Password</label>
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
          {errors.password?.type === 'required' && (
            <p className='text-red-500'>Password is required</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className='text-red-500'>Password must be at least 6 characters</p>
          )}

          {/* Forgot Password */}
          <div>
            <a className="link link-hover text-sm">Forgot password?</a>
          </div>

          {/* Submit Button */}
          <button className="btn btn-neutral w-full mt-2">Login</button>

          {/* Register Link */}
          <p className="text-sm text-gray-500 text-center mt-4">
            New to this website?{' '}
            <Link state={{ from }} to="/register" className="text-green-600 font-medium btn-link">
              Register
            </Link>
          </p>
        </fieldset>

        {/* Social Login Divider */}
        
        <SocialLogin />
      </form>
    </div>
  );
}

export default Login;
