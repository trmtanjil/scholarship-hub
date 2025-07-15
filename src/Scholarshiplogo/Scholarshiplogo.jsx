import React from 'react';
import { Link } from 'react-router'; 

function ScholarshipLogo() {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center gap-2">
        <img
          src="https://i.ibb.co/G4hGWH9h/sflogo.png"
          alt="ScholarFinder Logo"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-xl md:text-2xl font-bold text-blue-600">
          <span className="text-orange-500">Scholar</span>Finder
        </span>
      </Link>
    </div>
  );
}

export default ScholarshipLogo;
