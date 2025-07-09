import React, { useState } from 'react';
 import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hoocks/useAxiosSecure';
import ScholarshipCard from '../ScholarshipCard/ScholarshipCard';

const AllScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ['allScholarships'],
    queryFn: async () => {
      const res = await axiosSecure.get('/scholarships');
      return res.data;
    },
  });

  const filteredScholarships = scholarships.filter(item =>
    item.scholarshipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.scholarshipCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">All Scholarships</h2>

      {/* 🔍 Search Box */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by Scholarship, University, or Degree"
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn bg-blue-600 text-white">Search</button>
      </div>

      {/* 🖼️ No Scholarship Found */}
      {filteredScholarships.length === 0 && !isLoading && (
        <div className="text-center mt-10">
          <img src="https://i.ibb.co/6gGrxT7/no-data.png" alt="No Result" className="w-60 mx-auto mb-4" />
          <p className="text-lg text-gray-600">No Scholarship Found. Try a different search.</p>
        </div>
      )}

      {/* 🎴 Scholarship Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredScholarships.map(scholarship => (
          <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
        ))}
      </div>
    </div>
  );
};

export default AllScholarships;
