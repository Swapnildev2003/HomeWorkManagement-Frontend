import React from 'react';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

const RoleToggle = ({ role, setRole }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="mb-4 text-lg text-gray-600 font-semibold tracking-wide">
        Select Your Role
      </span>

      <div className="flex bg-white/40 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl overflow-hidden transition-all duration-300">
       
        <button
          onClick={() => setRole('Teacher')}
          className={`flex items-center gap-2 px-6 py-3 text-md font-semibold transition-all duration-300 ${
            role === 'Teacher'
              ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white scale-105'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <FaChalkboardTeacher className="text-xl" />
          Teacher
        </button>

        
        <button
          onClick={() => setRole('Student')}
          className={`flex items-center gap-2 px-6 py-3 text-md font-semibold transition-all duration-300 ${
            role === 'Student'
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white scale-105'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <FaUserGraduate className="text-xl" />
          Student
        </button>
      </div>
    </div>
  );
};

export default RoleToggle;
