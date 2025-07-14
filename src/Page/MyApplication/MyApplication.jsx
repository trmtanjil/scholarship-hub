import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hoocks/useAuth';
import useAxiosSecure from '../../hoocks/useAxiosSecure';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const MyApplication = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ['myApplications', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applied-scholarships?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleAddReviewClick = (application) => {
    setSelectedScholarship(application);
    setIsModalOpen(true);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      scholarshipId: selectedScholarship?.scholarshipId,
      scholarshipName: selectedScholarship?.scholarshipName || selectedScholarship?.subject,
      universityName: selectedScholarship?.universityName,
      rating: parseFloat(rating),
      comment,
      reviewDate: new Date().toISOString(),
      userName: user?.displayName,
      userEmail: user?.email,
      userImage: user?.photoURL || '', 
    };

    try {
      const res = await axiosSecure.post('/reviews', reviewData);
      if (res.data.insertedId) {
        Swal.fire('✅ Review Submitted', 'Thank you for your feedback!', 'success');
        setIsModalOpen(false);
        setRating('');
        setComment('');
        refetch();
      }
    } catch (error) {
      Swal.fire('❌ Failed', 'Could not submit review', 'error',error);
    }
  };




  const handleDelete = async (id) => {
  const confirm = await Swal.fire({
    title: 'Are you sure?',
    text: 'This will permanently delete the application!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
  });

  if (confirm.isConfirmed) {
    try {
      const res = await axiosSecure.delete(`/applied-scholarships/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Application has been removed.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        refetch(); // Optional: React Query data update
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to delete application', 'error');
    }
  }
};

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Applied Scholarships</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
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
                <td>{app.universityName}</td>
                <td>{app.address || 'N/A'}</td>
                <td>{app.category || 'N/A'}</td>
                <td>{app.degree || 'N/A'}</td>
                <td>${app.applicationFees || 0}</td>
                <td>${app.serviceCharge || 0}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    app.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                    app.status === 'completed' ? 'bg-green-100 text-green-700' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {app.status || 'pending'}
                  </span>
                </td>
                <td>{app.feedback || 'No feedback yet'}</td>
                <td className="space-x-2">
                  <Link to={`/sholarshipdetails/${app.scholarshipId}`}>
                    <button className="btn btn-sm btn-outline btn-info">Details</button>
                  </Link>

                  <button
  onClick={() => {
    if (app.status === 'pending') {
      // 👉 এখানে তুমি Edit Modal খুলতে পারো বা Navigate করতে পারো
      // উদাহরণ: 
      navigate(`/userdashboard/edit-application/${app._id}`)
      Swal.fire('📝 Allowed', 'You can edit this application.', 'info');
    } else {
      Swal.fire('⚠️ Cannot Edit', 'Your application is already processing or completed.', 'warning');
    }
  }}
  className="btn btn-sm btn-outline btn-warning"
>
  Edit
</button>


           <button
  onClick={() => handleDelete(app._id)}
  className="btn btn-sm btn-outline btn-error"
>
  Cancel
</button>

                  <button onClick={() => handleAddReviewClick(app)} className="btn btn-sm btn-outline btn-success">Add Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 space-y-4">
            <h3 className="text-lg font-bold mb-2">Add Review for {selectedScholarship?.universityName}</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-3">

              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="Rating (1 to 5)"
                className="input input-bordered w-full"
                required
              />

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Your Comment"
                className="textarea textarea-bordered w-full"
                required
              ></textarea>

              <button type="submit" className="btn btn-primary w-full">Submit Review</button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline w-full">Cancel</button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplication;
