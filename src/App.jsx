import React, { useEffect, useState } from 'react';
import RoleToggle from './components/RoleToggle';
import TeacherView from './views/TeacherView';
import StudentView from './views/StudentView';
import { FaTasks } from 'react-icons/fa';
import axios from 'axios';
function App() {
  const [role, setRole] = useState('Student');
  
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-100 px-4 py-10">
      <div className="max-w-6xl mx-auto text-center">
      
        <div className="flex justify-center items-center gap-3 mb-6">
          <FaTasks className="text-4xl text-blue-600 drop-shadow" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight">
            Homework Management System
          </h1>
        </div>

       
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Switch between <span className="font-semibold text-indigo-600">Teacher</span> and <span className="font-semibold text-green-600">Student</span> views to manage and submit assignments effortlessly.
        </p>

       
        <RoleToggle role={role} setRole={setRole} />

       
        <div className="mt-12">
          {role === 'Teacher' ? <TeacherView role={role}   /> : <StudentView  role={role}   />}
        </div>
      </div>
    </div>
  );
}

export default App;
