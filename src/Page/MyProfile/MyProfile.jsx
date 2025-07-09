import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hoocks/useAuth';
import useAxiosSecure from '../../hoocks/useAxiosSecure';

const MyProfile = () => {
  const { user } = useAuth();   // 👉 Directly getting photoURL from useAuth
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-8 text-center">
      <img
        src={user?.photoURL || userInfo?.photoURL || 'https://i.ibb.co/2FsfXqM/default-avatar.png'}
        alt="User"
        className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500 mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{user?.displayName || userInfo?.name || 'N/A'}</h2>
      <p className="text-gray-600 mb-2">{user?.email || userInfo?.email}</p>

      {userInfo?.role && userInfo?.role !== 'user' && (
        <p className="inline-block px-4 py-1 text-sm bg-green-100 text-green-700 rounded-full">
          Role: {userInfo?.role}
        </p>
      )}

      <div className="mt-4 text-left text-sm text-gray-500">
        <p><span className="font-medium">Account Created:</span> {user?.metadata?.creationTime || 'N/A'}</p>
        <p><span className="font-medium">Last Sign-in:</span> {user?.metadata?.lastSignInTime || 'N/A'}</p>
      </div>
    </div>
  );
};

export default MyProfile;
