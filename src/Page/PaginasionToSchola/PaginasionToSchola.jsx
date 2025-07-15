import React from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import useAxiosSecure from '../../hoocks/useAxiosSecure';
import { Link } from 'react-router';

const PaginasionToSchola = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch scholarships
  const { data: scholarships = [], isLoading, isError } = useQuery({
    queryKey: ['all-scholarships'],
    queryFn: async () => {
      const res = await axiosSecure.get('/top-scholarships');
      return res.data;
    },
  });

  // Fetch ratings for all scholarships using useQueries
  const ratingQueries = useQueries({
    queries:
      scholarships.map((scholarship) => ({
        queryKey: ['averageRating', scholarship._id],
        queryFn: async () => {
          const res = await axiosSecure.get(`/reviews/average-rating/${scholarship._id}`);
          return res.data;
        },
        enabled: scholarships.length > 0,
      })) || [],
  });

  if (isLoading) return <p className="text-center text-lg">Loading scholarships...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load scholarships.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Top Scholarships</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((scholarship, index) => {
          const ratingQuery = ratingQueries[index];
          const averageRating = ratingQuery?.data?.averageRating ?? 'No Rating';
          const ratingLoading = ratingQuery?.isLoading;

          return (
            <div
              key={scholarship._id}
              className="bg-[#E9FAF9] rounded-2xl p-5 space-y-3 relative shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Header with logo + name */}
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full">
                  <img
                    src={scholarship.universityImage}
                    alt="logo"
                    className="h-10 w-10 object-cover rounded-full"
                  />
                </div>
                <h3 className="font-semibold text-lg text-black">
                  {scholarship.scholarshipName}
                </h3>
              </div>

              {/* Amount and Deadline */}
              <div className="flex justify-between items-center mt-2 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-lg">💲</span>
                  <div>
                    <p className="text-gray-500">Application Fees:</p>
                    <p className="text-black font-bold">${scholarship.applicationFees}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-lg">📅</span>
                  <div>
                    <p className="text-gray-500">Deadline:</p>
                    <p className="text-black font-bold">
                      {new Date(scholarship.deadline).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                <span className="bg-white rounded-full px-3 py-1 text-sm text-gray-700">
                  {scholarship.subjectCategory || 'Selected Major(s)'}
                </span>
                <span className="bg-white rounded-full px-3 py-1 text-sm text-gray-700">
                  {scholarship.degree || 'Current Year in School'}
                </span>
              </div>
              <div>
                 <span className="bg-white rounded-full px-3 py-1 text-sm text-gray-700">
                  {scholarship.universityCountry || 'Selected  country'}
                </span>
                <span className="bg-white rounded-full px-3 py-1 text-sm text-gray-700">
                  {scholarship.universityCity || 'Current  city'}
                </span>
              </div>

              {/* Rating & Icons */}
              <div className="flex items-center justify-between mt-1 text-gray-500">
                <div className="flex gap-3 text-xl">
                  <span>🤍</span>
                  <span>🏆</span>
                </div>
                <div className="text-yellow-600 text-sm font-semibold">
                  {ratingLoading ? 'Loading...' : `⭐ ${averageRating} / 5`}
                </div>
              </div>

              {/* Apply Now Button */}
              <Link to={`/sholarshipdetails/${scholarship._id}`}>
                <button className=" bg-blue-600 text-white w-full py-2 mt-3 rounded-lg font-semibold transition-all">
                 Scholarship Details
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaginasionToSchola;
