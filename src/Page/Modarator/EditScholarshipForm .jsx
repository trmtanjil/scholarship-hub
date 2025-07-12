// src/components/EditScholarshipForm.jsx
import React, { useState } from 'react';

const EditScholarshipForm = ({ scholarship, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    scholarshipName: scholarship.scholarshipName || '',
    universityName: scholarship.universityName || '',
    subjectCategory: scholarship.subjectCategory || '',
    degree: scholarship.degree || '',
    applicationFees: scholarship.applicationFees || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...scholarship, ...formData });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Scholarship Name</label>
        <input
          type="text"
          name="scholarshipName"
          value={formData.scholarshipName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">University Name</label>
        <input
          type="text"
          name="universityName"
          value={formData.universityName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Subject Category</label>
        <input
          type="text"
          name="subjectCategory"
          value={formData.subjectCategory}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Degree</label>
        <select
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Degree</option>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Application Fees</label>
        <input
          type="number"
          name="applicationFees"
          value={formData.applicationFees}
          onChange={handleChange}
          className="input input-bordered w-full"
          min={0}
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-outline"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditScholarshipForm;
