import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hoocks/useAuth";
import useAxiosSecure from "../../hoocks/useAxiosSecure";
 

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role = "", isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return { role, isLoading };
};

export default useUserRole;
