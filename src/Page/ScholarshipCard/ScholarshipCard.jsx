import { Link } from 'react-router';

const ScholarshipCard = ({ scholarship }) => {
  const { _id, scholarshipName, universityName, subjectCategory, scholarshipCategory, applicationFees, postDate,universityImage } = scholarship;

  return (
    <div className="card bg-white rounded-lg shadow-md p-4">
      <img src={universityImage} alt={scholarshipName} className="rounded-lg h-48 w-full object-cover" />
      <h3 className="text-lg font-semibold mt-2">{scholarshipName}</h3>
      <p className="text-sm text-gray-600">University: {universityName}</p>
      <p className="text-sm text-gray-600">Subject: {subjectCategory}</p>
      <p className="text-sm text-gray-600">Category: {scholarshipCategory}</p>
      <p className="text-sm text-gray-600">Application Fee: ${applicationFees}</p>
      <p className="text-xs text-gray-500">Posted: {postDate}</p>
      <Link to={`/sholarshipdetails/${_id}`}>
        <button className="btn btn-sm mt-3 w-full bg-blue-600 text-white">Details</button>
      </Link>
    </div>
  );
};

export default ScholarshipCard;
