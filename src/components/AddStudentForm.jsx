import React, { useState } from 'react';
import { FaUserGraduate, FaEnvelope, FaPhone, FaUniversity, FaIdBadge } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AddStudentForm = ({ change,handleRoll }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [course, setCourse] = useState('');
  const [roll, setRoll] = useState('');

  const submitStudentData = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/students/", {
        name,
        email,
        phone_number: phoneNo,
        course,
        roll_number: roll
      });

      toast.success("✅ Student added successfully!");
      console.log("Added student:", response.data);
      console.log(name);
      handleRoll(roll);

      setTimeout(() => {
        change();
      }, 2000);

      
      setName('');
      setEmail('');
      setPhoneNo('');
      setCourse('');
      setRoll('');
    } catch (error) {
      console.error("Error adding student:", error);
      const errorMsg =
        error.response?.data?.error || error.response?.data || error.message;
      toast.error("❌ " + errorMsg);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name'){
      console.log(value)
       setName(value);
      
    } 
    else if (name === 'email') setEmail(value);
    else if (name === 'phoneNo') setPhoneNo(value);
    else if (name === 'course') setCourse(value);
    else if (name === 'roll') setRoll(value);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <FaUserGraduate className="text-blue-600" />
        Add Student
      </h2>

      <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1 flex items-center gap-2">Name:</label>
        <input
          value={name}
          onChange={handleChange}
          name='name'
          type="text"
          placeholder="Enter student name"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1 flex items-center gap-2">
          <FaEnvelope className="text-blue-500" />
          Email:
        </label>
        <input
          value={email}
          onChange={handleChange}
          name='email'
          type="email"
          placeholder="Enter email"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1 flex items-center gap-2">
          <FaPhone className="text-green-500" />
          Phone Number:
        </label>
        <input
          value={phoneNo}
          onChange={handleChange}
          name='phoneNo'
          type="tel"
          placeholder="Enter phone number"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1 flex items-center gap-2">
          <FaUniversity className="text-purple-500" />
          Course:
        </label>
        <input
          value={course}
          onChange={handleChange}
          name='course'
          type="text"
          placeholder="Enter course"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 text-sm mb-1 flex items-center gap-2">
          <FaIdBadge className="text-indigo-500" />
          Roll Number:
        </label>
        <input
          value={roll}
          onChange={handleChange}
          name='roll'
          type="text"
          placeholder="Enter roll number"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
        />
      </div>

      <button
        onClick={()=>{submitStudentData()}}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
      >
        Add Student
      </button>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default AddStudentForm;
