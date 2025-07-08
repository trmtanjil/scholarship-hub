import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
 

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: roleInfo = {}, roleLoading, refetch } = useQuery({
    queryKey: ['user-role', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !loading && !!user?.email,  // ✅ Wait until user is loaded
  });

  return { role: roleInfo.role, roleLoading, refetch };
};

export default useUserRole;
