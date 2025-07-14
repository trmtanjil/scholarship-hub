import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Carousel } from 'react-responsive-carousel';
import useAxiosSecure from '../../hoocks/useAxiosSecure';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // 🔁 Ensure this import is present

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    navigate(`/userdashboard/checkout/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg text-gray-800 mt-8">
      <img
        src={scholarship.universityImage}
        alt="University"
        className="w-full rounded-lg mb-4 h-64 object-cover"
      />
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

      <button
        onClick={handleApply}
        className="btn btn-success w-full mt-4"
      >
        Apply for Scholarship
      </button>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-center">User Reviews</h3>

      {reviews.length > 0 ? (
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          useKeyboardArrows
          showStatus={false}
          className="w-full max-w-3xl mx-auto"
        >
          {reviews.map((review) => (
            <div key={review._id} className="flex justify-center p-4">
              <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full text-center">
                <div className='w-8 h-8 rounded-full mx-auto'>
                  <img
                  src={review.userImage}
                  alt="Reviewer"
                  className=" rounded-full mx-auto mb-3 border-2 border-blue-400"
                />
                </div>
                <p className="text-lg font-semibold">{review.userName}</p>
                <p className="text-sm text-gray-500 mb-1">{review.reviewDate}</p>
                <p className="text-yellow-500 text-sm">⭐ {review.rating} / 5</p>
                <p className="text-gray-700 mt-3">{review.comment}</p>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="text-center text-gray-500 py-4">No reviews yet.</div>
      )}
    </div>
  );
};

export default ScholarshipDetails;
