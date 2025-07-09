import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hoocks/useAuth';
import useAxiosSecure from '../../hoocks/useAxiosSecure';
import { Link } from 'react-router';  // ✅ Corrected import (previously wrong)

const MyApplication = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['myApplications', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applied-scholarships?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Applied Scholarships</h2>

      <div className="overflow-x-auto">
        <table className="table w-full text-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>University Name</th>
              <th>University Address</th>
              <th>Subject Category</th>
              <th>Degree</th>
              <th>Application Fees</th>
              <th>Service Charge</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td>{app.universityName || 'N/A'}</td>
                <td>{app.universityAddress || app.address || 'N/A'}</td> {/* ✅ Fixed */}
                <td>{app.category || 'N/A'}</td>
                <td>{app.degree || 'N/A'}</td>
                <td>${app.applicationFees ?? 0}</td> {/* ✅ Fixed */}
                <td>${app.serviceCharge ?? 0}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      app.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : app.status === 'processing'
                        ? 'bg-blue-100 text-blue-700'
                        : app.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : app.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {app.status || 'pending'}
                  </span>
                </td>
                <td>{app.feedback || 'No feedback yet'}</td>
                <td className="space-y-1 flex flex-col items-start">
                  <Link to={`/scholarship/${app.scholarshipId}`}>
                    <button className="btn btn-xs btn-outline btn-info w-full">Details</button>
                  </Link>
                  <button className="btn btn-xs btn-outline btn-warning w-full">Edit</button>
                  <button className="btn btn-xs btn-outline btn-error w-full">Cancel</button>
                  <button className="btn btn-xs btn-outline btn-success w-full">Add Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {applications.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No applications found.</p>
        )}
      </div>
    </div>
  );
};

export default MyApplication;
