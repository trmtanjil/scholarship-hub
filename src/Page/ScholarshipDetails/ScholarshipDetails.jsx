import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Carousel } from 'react-responsive-carousel';
import useAxiosSecure from '../../hoocks/useAxiosSecure';

const ScholarshipDetails = () => {
  const { id } = useParams();       // 📌 Get Scholarship ID from URL
  const navigate = useNavigate();   // 📌 For Apply button navigation
  const axiosSecure = useAxiosSecure();

  // ✅ Get Scholarship Details
  const { data: scholarship = {}, isLoading: loadingScholarship } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  // ✅ Get Reviews
  const { data: reviews = [], isLoading: loadingReviews } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  if (loadingScholarship || loadingReviews) return <p className="text-center">Loading...</p>;

  const handleApply = () => {
    navigate(`/userdashboard/checkout/${id}`)   // ✅ Takes to Payment Page
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg text-gray-800 mt-8">
      <img src={scholarship.universityImage} alt="" className="w-full rounded-lg mb-4 h-64 object-cover" />
      <h2 className="text-3xl font-bold mb-2">{scholarship.universityName}</h2>
      <p>🎓 Category: {scholarship.scholarshipCategory}</p>
      <p>📍 Location: {scholarship.universityCountry}, {scholarship.universityCity}</p>
      <p>⏳ Deadline: {scholarship.deadline}</p>
      <p>📚 Subject: {scholarship.subjectCategory}</p>
      <p>📝 Description: {scholarship.description || 'No description available'}</p>
      <p>💰 Stipend: {scholarship.stipend || 'Not Available'}</p>
      <p>🗓️ Post Date: {scholarship.postDate}</p>
      <p>💵 Service Charge: ${scholarship.serviceCharge}</p>
      <p>💵 Application Fees: ${scholarship.applicationFees}</p>

      <button onClick={handleApply} className="btn btn-success w-full mt-4">Apply for Scholarship</button>

      <h3 className="text-2xl font-semibold mt-8 mb-4">User Reviews</h3>

      <Carousel showThumbs={false} infiniteLoop useKeyboardArrows>
        {reviews.length > 0 ? reviews.map(review => (
          <div key={review._id} className="p-4 border rounded-lg text-center">
            <img src={review.reviewerImage} alt="Reviewer" className="w-16 h-16 rounded-full mx-auto mb-2" />
            <p className="font-semibold">{review.reviewerName}</p>
            <p className="text-sm text-gray-500">{review.reviewDate}</p>
            <p className="text-yellow-500">⭐ {review.ratingPoint} / 5</p>
            <p className="mt-2 text-gray-600">{review.comment}</p>
          </div>
        )) : <p className="text-gray-500">No reviews yet.</p>}
      </Carousel>
    </div>
  );
};

export default ScholarshipDetails;