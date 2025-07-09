import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAuth from '../../hoocks/useAuth';
import useAxiosSecure from '../../hoocks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [editingReview, setEditingReview] = useState(null);
  const [newRating, setNewRating] = useState('');
  const [newComment, setNewComment] = useState('');

  // ✅ Get My Reviews
  const { data: reviews = [], refetch, isLoading } = useQuery({
    queryKey: ['myReviews', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ✅ Delete Review
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "This review will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/reviews/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
          refetch();
        }
      } catch (error) {
        Swal.fire('Failed!', 'Something went wrong.', 'error');
      }
    }
  };

  // ✅ Edit Review
  const handleEdit = (review) => {
    setEditingReview(review);
    setNewRating(review.rating);
    setNewComment(review.comment);
  };

  const handleUpdate = async () => {
    try {
      const updatedReview = {
        rating: parseFloat(newRating),
        comment: newComment,
        reviewDate: new Date().toISOString(),
      };

      const res = await axiosSecure.patch(`/reviews/${editingReview._id}`, updatedReview);
      if (res.data.modifiedCount > 0) {
        Swal.fire('Updated!', 'Your review has been updated.', 'success');
        setEditingReview(null);
        refetch();
      }
    } catch (error) {
      Swal.fire('Failed!', 'Failed to update review.', 'error',error);
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Reviews</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Scholarship Name</th>
              <th>University Name</th>
              <th>Comment</th>
              <th>Review Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review._id}>
                <td>{index + 1}</td>
                <td>{review.scholarshipName || 'N/A'}</td>
                <td>{review.universityName || 'N/A'}</td>
                <td>{review.comment || 'No Comment'}</td>
                <td>{new Date(review.reviewDate).toLocaleDateString()}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleEdit(review)}
                    className="btn btn-sm btn-outline btn-warning"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Edit Modal */}
      {editingReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg space-y-4 w-96">
            <h3 className="text-lg font-semibold mb-2">Edit Review</h3>

            <input
              type="number"
              min="1"
              max="5"
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
              placeholder="Rating (1-5)"
              className="input input-bordered w-full"
            />

            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Your Comment"
              className="textarea textarea-bordered w-full"
            ></textarea>

            <button onClick={handleUpdate} className="btn btn-primary w-full">Update Review</button>
            <button onClick={() => setEditingReview(null)} className="btn btn-outline w-full">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
