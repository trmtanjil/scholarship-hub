import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hoocks/useAxiosSecure';
import useAuth from '../../hoocks/useAuth';
import { FiInfo, FiMessageSquare, FiTrash2, FiX } from 'react-icons/fi';
import Swal from 'sweetalert2';

const AllappliedSlspMdtr = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const userEmail = user?.email;

  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
const [feedbackText, setFeedbackText] = useState('');

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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Degree</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-gray-500">No applications found</td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">{app.universityName}</div>
                      <div className="text-sm text-gray-500">{app.universityCountry || 'N/A'}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">{app.subject}</div>
                      <div className="text-sm text-gray-500">{app.category}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {app.degree}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setShowDetails(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                        title="Details"
                      >
                        <FiInfo className="h-5 w-5" />
                      </button>
                     <button
  onClick={() => {
    setSelectedApp(app);
    setShowFeedbackModal(true);
    setFeedbackText(app.feedback || ''); // আগের ফিডব্যাক থাকলে দেখাবে
  }}
  className="text-yellow-600 hover:text-yellow-900 p-1 rounded-full hover:bg-yellow-50"
  title="Feedback"
>
  <FiMessageSquare className="h-5 w-5" />
</button>




                           <button
  onClick={async (e) => {
    e.stopPropagation();
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel it',
      cancelButtonText: 'No',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.put(`/applied-scholarships/cancel/${app._id}`);
        Swal.fire({
          title: 'Cancelled!',
          text: 'Application has been marked as rejected.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Failed to cancel application', 'error');
      }
    }
  }}
  className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
  title="Cancel"
>
  <FiTrash2 className="h-5 w-5" />
</button>





                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      

{showFeedbackModal && selectedApp && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative">
      <div className="flex justify-between items-center bg-yellow-500 text-white px-4 py-3 rounded-t">
        <h3 className="text-lg font-semibold">Provide Feedback</h3>
        <button onClick={() => setShowFeedbackModal(false)} className="hover:text-yellow-100">
          <FiX className="h-6 w-6" />
        </button>
      </div>
      <div className="p-4 space-y-3">
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Write your feedback here..."
          rows="5"
          className="w-full border border-gray-300 rounded p-2 text-sm"
        ></textarea>
        <div className="flex justify-end">
          <button
            onClick={async () => {
              try {
                await axiosSecure.put(`/applied-scholarships/feedback/${selectedApp._id}`, {
                  feedback: feedbackText
                });
                setShowFeedbackModal(false);
                Swal.fire({
                  title: 'Feedback Submitted',
                  icon: 'success',
                  timer: 1500,
                  showConfirmButton: false,
                });
              } catch (err) {
                console.error(err);
                Swal.fire('Error', 'Failed to submit feedback', 'error');
              }
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  </div>
)}






      {/* Details Modal */}
      {showDetails && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative">
            <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-3 rounded-t">
              <h3 className="text-lg font-semibold">Application Details</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="hover:text-blue-100"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 text-sm text-gray-700 space-y-2">
              <p><strong>University:</strong> {selectedApp.universityName}</p>
              <p><strong>Degree:</strong> {selectedApp.degree}</p>
              <p><strong>Subject:</strong> {selectedApp.subject}</p>
              <p><strong>Category:</strong> {selectedApp.category}</p>
              <p><strong>Status:</strong> {selectedApp.status}</p>
              <p><strong>Applied Date:</strong> {new Date(selectedApp.appliedDate).toLocaleDateString()}</p>
            </div>
            <div className="px-4 py-3 bg-gray-50 rounded-b flex justify-end">
              <button
                onClick={() => setShowDetails(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllappliedSlspMdtr;
