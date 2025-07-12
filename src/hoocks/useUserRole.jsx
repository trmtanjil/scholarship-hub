import { useQuery } from "@tanstack/react-query";
import useAuth from "../hoocks/useAuth";

import useAxios from "./useAxios";
 

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosInstance = useAxios();

  const { data: role = '', isLoading: roleLoading } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.email}`);
      return res.data.role;
    }
  });

  return { role, roleLoading };
};

export default useUserRole;
