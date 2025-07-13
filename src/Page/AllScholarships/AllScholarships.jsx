import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hoocks/useAxiosSecure';
import ScholarshipCard from '../ScholarshipCard/ScholarshipCard';

const AllScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const limit = 6;

  // 🔁 Fetch Data with Search & Pagination
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

  // 🔍 Search handler
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when search term changes
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">All Scholarships</h2>

      {/* 🔍 Search Box */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by Scholarship, University, or Category"
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={() => refetch()} className="btn bg-blue-600 text-white">
          Search
        </button>
      </div>

      {/* 🖼️ No Scholarship Found */}
      {scholarships.length === 0 && !isLoading && (
        <div className="text-center mt-10">
          <img
            src="https://i.ibb.co/6gGrxT7/no-data.png"
            alt="No Result"
            className="w-60 mx-auto mb-4"
          />
          <p className="text-lg text-gray-600">
            No Scholarship Found. Try a different search.
          </p>
        </div>
      )}

      {/* 🎴 Scholarship Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {scholarships.map((scholarship) => (
          <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
        ))}
      </div>

      {/* 🔢 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setPage(num + 1)}
              className={`px-4 py-2 rounded ${
                page === num + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
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
