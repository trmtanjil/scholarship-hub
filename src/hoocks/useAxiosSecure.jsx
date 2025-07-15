import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { getIdToken } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const axiosSecure = axios.create({
  baseURL: `https://scholarship-hub-server.vercel.app`,
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await getIdToken(auth.currentUser); // ✅ এখান থেকে Firebase token নেবে
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
