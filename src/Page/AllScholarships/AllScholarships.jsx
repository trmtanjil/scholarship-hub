import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hoocks/useAxiosSecure';
import { Link } from 'react-router';

const AllScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data = {}, isLoading, refetch } = useQuery({
    queryKey: ['scholarshipss', searchTerm, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/scholarshipss?search=${searchTerm}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  const scholarships = data.result || [];
  const total = data.total || 0;
  const totalPages = Math.ceil(total / limit);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Explore All Scholarships
      </h2>

      {/* 🔍 Search Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
        <input
          type="text"
          placeholder="Search by Scholarship, University, or Category"
          className="input input-bordered w-full md:w-2/3"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          onClick={() => refetch()}
          className="btn bg-[#FF6B2D] hover:bg-[#ff7e47] text-white w-full md:w-auto"
        >
          Search
        </button>
      </div>

      {/* ⛔ No Result */}
      {scholarships.length === 0 && !isLoading && (
        <div className="text-center mt-12">
          <img
            src="https://i.ibb.co/6gGrxT7/no-data.png"
            alt="No Result"
            className="w-60 mx-auto mb-4"
          />
          <p className="text-lg text-gray-600 font-medium">
            No Scholarship Found. Try a different search.
          </p>
        </div>
      )}

      {/* 🎓 Scholarship Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {scholarships.map((scholarship) => (
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

            {/* Icons */}
            <div className="flex items-center justify-between mt-1 text-gray-500">
              <div className="flex gap-3 text-xl">
                <span>🤍</span>
                <span>🏆</span>
              </div>
              <div className="text-yellow-600 text-sm font-semibold">
                {/* Rating optional here */}
              </div>
            </div>

            {/* Details Button */}
            <Link to={`/sholarshipdetails/${scholarship._id}`}>
              <button className=" bg-blue-600 text-white w-full py-2 mt-3 rounded-lg font-semibold transition-all">
                Scholarship Details
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* 🔢 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2 flex-wrap">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setPage(num + 1)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                page === num + 1
                  ? 'bg-[#FF6B2D] text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllScholarships;
