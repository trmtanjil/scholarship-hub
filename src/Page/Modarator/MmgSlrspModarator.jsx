import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hoocks/useAxiosSecure';
import { FaInfoCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ['allScholarships'],
    queryFn: async () => {
      const res = await axiosSecure.get('/scholarships');
      return res.data;
    },
  });

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
                <button onClick={() => navigate(`/sholarshipdetails/${sch._id}`)}>
                  <FaInfoCircle className="text-blue-500 cursor-pointer" />
                </button>
                <button >
                  <FaEdit className="text-yellow-500 cursor-not-allowed" />
                </button>
                <button >
                  <FaTrashAlt className="text-red-500 cursor-not-allowed" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageScholarships;
