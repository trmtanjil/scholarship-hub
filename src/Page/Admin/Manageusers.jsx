import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hoocks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/users/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "User has been deleted.", "success");
          refetch();
        }
      } catch (err) {
        Swal.fire("Error!", "Failed to delete user.", "error",err);
      }
    }
  };

  const handleMakeRole = async (id, role) => {
    const result = await Swal.fire({
      title: `Are you sure to make this user ${role}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, make ${role}`,
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/users/role/${id}`, { role });
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success", `User is now ${role}`, "success");
          refetch();
        }
      } catch (err) {
        Swal.fire("Error", "Failed to update role", "error",err);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-black bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      <div className="overflow-x-auto">
        <table className="table w-full text-left">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role || "user"}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td className="flex flex-wrap gap-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleMakeRole(user._id, "admin")}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Make Admin
                    </button>
                  )}
                  {user.role !== "moderator" && (
                    <button
                      onClick={() => handleMakeRole(user._id, "moderator")}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Make Moderator
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
