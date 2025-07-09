import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hoocks/useAuth';
import useAxiosSecure from '../../hoocks/useAxiosSecure';


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


  // ✅ Edit Review



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
                  
                    className="btn btn-sm btn-outline btn-warning"
                  >
                    Edit
                  </button>
                  <button
                 
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

            <button className="btn btn-primary w-full">Update Review</button>
            <button onClick={() => setEditingReview(null)} className="btn btn-outline w-full">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
