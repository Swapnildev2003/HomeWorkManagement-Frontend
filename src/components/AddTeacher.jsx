import axios from 'axios';
import React, { useState } from 'react';
import { FaChalkboardTeacher, FaEnvelope, FaPhone, FaBookOpen } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTeacherForm = ({ change,handleId,handleName }) => {
  const [id,setid]=useState("")
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNo] = useState('');
  const [subject, setSubject] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') setName(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'phoneNo') setPhoneNo(value);
       else if (name === 'number') setid(value);
    else if (name === 'subject') setSubject(value);
  };


  const submitTeacherData = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/teachers/", {
        id_no:id,
        name,
        email,
        phone_number,
        subject


      })
      toast.success("✅ Teacher added successfully!");
      console.log("Added Teacher:", response.data);

      setTimeout(() => {
        change();
      }, 2000);
      setName('');
      setName('');
      setPhoneNo('');
      setSubject('');
      setEmail('');
      setid('')
    }
    catch (error) {
      console.error("Error adding teacher:", error);
      const errorMsg =
        error.response?.data?.error || error.response?.data || error.message;
      toast.error("❌" + errorMsg);
    }
  }
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <FaChalkboardTeacher className="text-indigo-600" />
        Add Teacher
      </h2>
    <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1 flex items-center gap-2">id:</label>
        <input
          value={id}
          onChange={handleChange}
          name='number'
          type="number"
          placeholder="Enter your id"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1 flex items-center gap-2">Name:</label>
        <input
          value={name}
          onChange={handleChange}
          name='name'
          type="text"
          placeholder="Enter teacher's name"
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
          placeholder="Enter teacher's email"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1 flex items-center gap-2">
          <FaPhone className="text-green-500" />
          Phone Number:
        </label>
        <input
          value={phone_number}
          onChange={handleChange}
          name='phoneNo'
          type="tel"
          placeholder="Enter phone number"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 text-sm mb-1 flex items-center gap-2">
          <FaBookOpen className="text-purple-500" />
          Subject:
        </label>
        <input
          value={subject}
          onChange={handleChange}
          name='subject'
          type="text"
          placeholder="Enter subject taught"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
        />
      </div>

      <button onClick={() =>{handleId(id),submitTeacherData(),handleName(name)}}  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded transition">
        Add Teacher
      </button>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default AddTeacherForm;
