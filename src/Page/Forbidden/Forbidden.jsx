import React from 'react';
import { Link } from 'react-router';
import { Lock } from 'lucide-react';

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-600 mb-6 shadow-lg">
          <Lock size={48} />
        </div>
        <h1 className="text-5xl font-bold mb-4">403 Forbidden</h1>
        <p className="text-lg mb-6 max-w-md mx-auto">
          You don't have permission to access this page. Please contact the administrator if you believe this is an error.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
