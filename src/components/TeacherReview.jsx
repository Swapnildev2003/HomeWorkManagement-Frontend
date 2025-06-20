import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserCheck,
} from 'react-icons/fa';

const TeacherReviewForm = ({ submissionId, teacher_id }) => {
  const [submissionIdState, setSubmissionIdState] = useState('');
  const [teacherIdState, setTeacherIdState] = useState('');
  const [feedback, setFeedback] = useState('');
  const [date, setDateTime] = useState('');
  const [grade,setGrade]=useState('')

  useEffect(() => {
    setSubmissionIdState(submissionId || '');
    setTeacherIdState(teacher_id || '');
  }, [submissionId, teacher_id]);

  const handleSubmit =async () => {
    const reviewData = {
      submission: submissionIdState,
      teacher: teacherIdState,
      review_grade:grade,
      teacher_review:feedback,
      reviewed_at:date,
    };
    try {
       const reviewSubmission=await axios.post("http://127.0.0.1:8000/api/reviews/",reviewData)
        toast.success("✅ Review Done successfully!");
    } catch (error) {
      console.log(error)
        const errorMsg = error.response?.data?.error || error.response?.data || error.message;
        toast.error("❌ " + errorMsg);
    }
   
    
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <FaUserCheck className="text-green-600" />
        Teacher Review Panel
      </h2>

      {/* Assignment ID */}
      <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1 flex items-center gap-2">
          <FaUserGraduate className="text-blue-500" />
          Assignment ID:
        </label>
        <input
          type="text"
          value={submissionIdState}
          onChange={(e) => setSubmissionIdState(e.target.value)}
          className="w-full px-3 py-2 border rounded text-gray-800"
        />
      </div>

      {/* Teacher ID */}
      <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1 flex items-center gap-2">
          <FaChalkboardTeacher className="text-purple-500" />
          Teacher ID:
        </label>
        <input
          type="text"
          value={teacherIdState}
          onChange={(e) => setTeacherIdState(e.target.value)}
          className="w-full px-3 py-2 border rounded text-gray-800"
        />
      </div>

      {/* Feedback */}
        <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1">Review Grade:</label>
        <input
          className="w-full border px-3 py-2 rounded text-gray-800"
          type='text'
          placeholder="Enter your review grade for the student..."
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm mb-1">Review Feedback:</label>
        <textarea
          className="w-full border px-3 py-2 rounded text-gray-800"
          rows={4}
          placeholder="Enter your review for the student..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-600 text-sm mb-1">Date:</label>
          <input
            type="datetime-local"
            className="w-full border px-3 py-2 rounded text-gray-800"
            value={date}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </div>
       
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded transition"
      >
        Submit Review
      </button>
       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default TeacherReviewForm;
