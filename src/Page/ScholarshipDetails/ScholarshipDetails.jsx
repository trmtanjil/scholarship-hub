import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
 
import { Carousel } from 'react-responsive-carousel'; // You can use Swiper or any other carousel
import useAxiosSecure from '../../hoocks/useAxiosSecure';

const ScholarshipDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: scholarship = {} } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg text-gray-800 mt-8">
      <img src={scholarship.universityImage} alt="" className="w-full rounded-lg mb-4" />
      <h2 className="text-3xl font-bold mb-2">{scholarship.universityName}</h2>
      <p className="mb-1">🎓 Scholarship Category: {scholarship.scholarshipCategory}</p>
      <p className="mb-1">📍 Location: {scholarship.universityCountry}, {scholarship.universityCity}</p>
      <p className="mb-1">⏳ Deadline: {scholarship.deadline}</p>
      <p className="mb-1">📚 Subject: {scholarship.subjectCategory}</p>
      <p className="mb-1">💬 Description: {scholarship.description || 'No description available'}</p>
      <p className="mb-1">💰 Stipend: {scholarship.stipend || 'Not Available'}</p>
      <p className="mb-1">🗓️ Post Date: {scholarship.postDate}</p>
      <p className="mb-1">💵 Service Charge: ${scholarship.serviceCharge}</p>
      <p className="mb-4">💵 Application Fees: ${scholarship.applicationFees}</p>

      <button className="btn btn-success w-full mb-8">Apply for Scholarship</button>

      <h3 className="text-2xl font-semibold mb-4">User Reviews</h3>

      <Carousel showThumbs={false} infiniteLoop useKeyboardArrows>
        {reviews.length > 0 ? reviews.map(review => (
          <div key={review._id} className="p-4 border rounded-lg">
            <img src={review.reviewerImage} alt="" className="w-16 h-16 rounded-full mx-auto mb-2" />
            <p className="font-semibold">{review.reviewerName}</p>
            <p className="text-sm text-gray-500">{review.reviewDate}</p>
            <p className="text-yellow-500">⭐ {review.ratingPoint} / 5</p>
            <p className="mt-2">{review.comment}</p>
          </div>
        )) : <p>No reviews yet.</p>}
      </Carousel>
    </div>
  );
};

export default ScholarshipDetails;
