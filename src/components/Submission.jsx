import axios from 'axios';
import React, { useState } from 'react';
import { FaFileAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
const StudentSubmission = ({ StudentRoll, id,subject }) => {
  const [roll, setRoll] = useState(12);
  const [status, setStatus] = useState('');
  const [date, set_date] = useState('');
  const [student_remark, setStudent_remark] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'student') setName(value);

    else if (name === 'status') setStatus(value);
    else if (name === 'submitted_at') set_date(value);

    else if (name === 'student_remark') setStudent_remark(value);
    else if (name === 'subject') setSubject(value);

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("student", roll)
      formData.append("assignment", id)
      formData.append('subject',subject)
      console.log(e.target.submitted_file.files[0])
      if (e.target.submitted_file.files[0]) {
        formData.append('submitted_file', e.target.submitted_file.files[0])
      }
      formData.append("status", status)
      formData.append("submitted_at", date)
      formData.append("student_remark", student_remark)
      console.log(formData)
      const sendSubmission = await axios.post("http://127.0.0.1:8000/api/submissions/",
        formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      )
      toast.success("✅ Submission sent successfully!");
    } catch (error) {
      console.error("Error adding student:", error);
      const errorMsg = error.response?.data?.error || error.response?.data || error.message;
      toast.error("❌ " + errorMsg);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Student Submission</h2>

      {/* Student Name */}
      <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1">Student ID:</label>
        <input
          type="number"
          value={roll}
          readOnly
          className="w-full border rounded px-3 py-2 text-gray-800"
          name="student"
        />
      </div>

 <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1">Subject:</label>
        <input
          type="text"
          value={subject}
          readOnly
          className="w-full border rounded px-3 py-2 text-gray-800"
          name="subject"
        />
      </div>

      {/* Assignment Title File Upload */}
      <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1 flex items-center gap-2">
          <FaFileAlt className="text-purple-500" />
          Assignment File:
        </label>
        <input
          value={id}
          type="text"
          readOnly
          placeholder="Enter assignment file name or link"
          className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded p-2"
          name="assignment_file"
        />
        <p className="text-sm text-gray-500 mt-1">Provide the file name or link to the assignment.</p>
      </div>

      {/* Submitted File */}
      <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1 flex items-center gap-2">
          <FaFileAlt className="text-blue-500" />
          Submitted File:
        </label>
        <input
          type="file"
          accept=".pdf"
          className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded p-2"
          name="submitted_file"
        />
        <p className="text-sm text-gray-500 mt-1">No file chosen</p>
      </div>

      {/* Status */}
      <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1 flex items-center gap-2">
          <FaCheckCircle className="text-green-500" />
          Status:
        </label>
        <select onChange={handleChange} value={ status }
          className="w-full border border-yellow-300 bg-yellow-50 text-yellow-700 rounded px-3 py-2"
          name="status"
        >
          <option>Pending</option>
          <option>Submitted</option>
          <option>Reviewed</option>
        </select>
      </div>

      {/* Submission Time */}
      <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1 flex items-center gap-2">
          <FaClock className="text-gray-500" />
          Submitted At:
        </label>
        <input onChange={handleChange}
          value={date}
          type="date"
          className="w-full border rounded px-3 py-2 text-gray-800"
          name="submitted_at"
        />
        <p className="text-sm text-gray-500 mt-1">Note: You are 5.5 hours ahead of server time.</p>
      </div>

      {/* Student Remark */}
      <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1">Student Remark:</label>
        <textarea onChange={handleChange}
          value={student_remark}
          className="w-full border px-3 py-2 rounded text-gray-800"
          rows={3}
          placeholder="Enter your remark..."
          name="student_remark"
        />
      </div>

      {/* Submit Button */}
      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
        >
          Submit
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </form>
  );
};

export default StudentSubmission;
