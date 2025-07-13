import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hoocks/useAxiosSecure";
import { FaInfoCircle, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import EditScholar from "../EditScholaship/EditScholar";
import Swal from "sweetalert2";



const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: scholarships = [], isLoading ,refetch} = useQuery({
    queryKey: ["allScholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return res.data;
    },
  });

  console.log(scholarships)
  // State to control modal and selected scholarship
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  // Open modal handler
  const openEditModal = (scholarship) => {
    setSelectedScholarship(scholarship);
  };

  // Close modal handler
  const closeEditModal = () => {
    setSelectedScholarship(null);
  };

  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      const res = await axiosSecure.delete(`/scholarships/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Scholarship has been deleted.", "success");
        refetch(); // ✅ update list
      } else {
        Swal.fire("Error!", "Failed to delete scholarship.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Server error occurred!", "error");
    }
  }
};



  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">All Scholarships</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Scholarship Name</th>
            <th>University</th>
            <th>Category</th>
            <th>Degree</th>
            <th>Fees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {scholarships.map((sch) => (
            <tr key={sch._id}>
              <td>{sch.scholarshipName}</td>
              <td>{sch.universityName}</td>
              <td>{sch.subjectCategory}</td>
              <td>{sch.degree}</td>
              <td>${sch.applicationFees}</td>
              <td className="space-x-2">
                <button
                  onClick={() => navigate(`/sholarshipdetails/${sch._id}`)}
                >
                  <FaInfoCircle className="text-blue-500 cursor-pointer" />
                </button>

                <button onClick={() => openEditModal(sch)}>
                  <FaEdit className="text-yellow-500 cursor-pointer" />
                </button>

                <button  onClick={() => handleDelete(sch._id)}>
                  <FaTrashAlt className="text-red-500 cursor-not-allowed" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedScholarship && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeEditModal}
        >
          <div
            className="bg-white rounded p-6 w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeEditModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-lg font-bold"
              aria-label="Close modal"
            >
              ✕
            </button>
           <EditScholar
  scholarship={selectedScholarship}
  onClose={closeEditModal}
  refetch={refetch}
/>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;
