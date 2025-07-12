import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hoocks/useAxiosSecure';
import useAuth from '../../hoocks/useAuth';
import { FiInfo, FiMessageSquare, FiTrash2 } from 'react-icons/fi';

const AllappliedSlspMdtr = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const userEmail = user?.email;

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['allAppliedScholarships', userEmail],
    enabled: !!userEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(`/applied-scholarships?email=${userEmail}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-5 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h2 className="text-2xl md:text-3xl font-bold">Your Scholarship Applications</h2>
          <p className="text-blue-100 mt-1">View and manage all your applications</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">University</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Program</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Degree</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Applied Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-gray-500">No applications found</td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {app.universityName?.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{app.universityName}</div>
                          <div className="text-sm text-gray-500">{app.universityCountry || 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">{app.subject}</div>
                      <div className="text-sm text-gray-500">{app.category}</div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {app.degree}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 hidden md:table-cell">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                          title="Details"
                        >
                          <FiInfo className="h-5 w-5" />
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="text-yellow-600 hover:text-yellow-900 p-1 rounded-full hover:bg-yellow-50"
                          title="Feedback"
                        >
                          <FiMessageSquare className="h-5 w-5" />
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                          title="Cancel"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllappliedSlspMdtr;
