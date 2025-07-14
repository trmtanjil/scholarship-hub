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
      <h2 className="text-3xl font-bold mb-6 text-center">All Scholarships</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((scholarship, index) => {
          const ratingQuery = ratingQueries[index];
          const averageRating = ratingQuery?.data?.averageRating ?? 'No Rating';
          const ratingLoading = ratingQuery?.isLoading;

          return (
            <div
              key={scholarship._id}
              className="card bg-white shadow-md p-4 rounded-xl hover:shadow-lg transition"
            >
              <img
                src={scholarship.universityImage}
                alt={scholarship.universityName}
                className="rounded-lg mb-3 h-40 object-cover w-full"
              />

              <h3 className="text-xl font-semibold mb-1">{scholarship.scholarshipName}</h3>
              <p className="text-gray-600 mb-1">{scholarship.universityName}</p>

              <div className="text-sm text-gray-500 mb-1">
                <strong>Category:</strong> {scholarship.scholarshipCategory}
              </div>

              <div className="text-sm text-gray-500 mb-1">
                <strong>Location:</strong> {scholarship.universityCountry}, {scholarship.universityCity}
              </div>

              <div className="text-sm text-gray-500 mb-1">
                <strong>Subject:</strong> {scholarship.subjectCategory}
              </div>

              <div className="text-sm text-gray-500 mb-1">
                <strong>Application Deadline:</strong> {scholarship.deadline}
              </div>

              <div className="text-sm text-gray-500 mb-1">
                <strong>Application Fees:</strong> ${scholarship.applicationFees}
              </div>

              <div className="text-sm text-gray-500 mb-2">
                {ratingLoading ? (
                  <p className="text-sm text-gray-400 italic mt-1">Loading rating...</p>
                ) : (
                  <p className="text-sm text-yellow-600 font-semibold mt-1">
                    ⭐ {averageRating} / 5
                  </p>
                )}
              </div>

              <Link to={`/scholarshipdetails/${scholarship._id}`}>
                <button className="btn btn-primary w-full">Scholarship Details</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaginasionToSchola;
