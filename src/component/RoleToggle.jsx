import React from 'react';

const RoleToggle = ({ role, setRole }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="mb-2 text-gray-600">Select Role:</span>
      <div className="inline-flex border rounded-lg overflow-hidden">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            role === 'Teacher' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
          }`}
          onClick={() => setRole('Teacher')}
        >
          Teacher
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            role === 'Student' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
          }`}
          onClick={() => setRole('Student')}
        >
          Student
        </button>
      </div>
    </div>
  );
};

export default RoleToggle;
