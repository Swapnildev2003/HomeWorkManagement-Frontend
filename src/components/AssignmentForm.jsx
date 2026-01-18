import React, { useEffect, useState } from 'react';
import { FaUserTie, FaBook, FaListAlt, FaCalendarAlt, FaAlignLeft, FaCommentDots, FaFilePdf, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AssignmentForm = ({ formState, id, handleSuccess, fetchAssignments, handleSubject }) => {

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [type, setType] = useState('Homework');
  const [due_date, setDue_date] = useState('');
  const [description, setDescription] = useState('');
  const [teacher_remark, setTeacher_remark] = useState('');
  const [status, setStatus] = useState('Pending');
  const [pdf, setPdf] = useState('');
  useEffect(() => {
    const TeacherData = async (id) => {
      try {
        const response = await axios.get(`http://15.135.83.103:8000/api/teachers/${id}/`);
        const result = response.data
        setSubject(result.subject)
        setTeacher(result.name)
        handleSubject(subject)


      } catch (error) {
        console.error("Error adding student:", error);


      }
    };
    TeacherData(id)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;


    if (name === 'title') setTitle(value);

    else if (name === 'type') setType(value);
    else if (name === 'due_date') setDue_date(value);
    else if (name === 'description') setDescription(value);
    else if (name === 'teacher_remark') setTeacher_remark(value);
    else if (name === 'status') setStatus(value);
  };

  // const handleFile = (e) => {
  //   const fileName = e.target.files[0].name;
  //   setPdf(fileName);
  //   console.log(fileName);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('teacher', id);
      formData.append('title', title);
      formData.append('subject', subject);
      formData.append('type', type);
      formData.append('due_date', due_date);
      formData.append('description', description);
      formData.append('teacher_remark', teacher_remark);
      formData.append('status', status);

      console.log(e.target.pdf.files[0], "file data hai")
      if (e.target.pdf.files[0]) {

        formData.append('pdf', e.target.pdf.files[0]);
      }

      const sendAssignment = await axios.post(
        "http://15.135.83.103:8000/api/assignments/",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.success("✅ Assignment added successfully!");
      formState()
      console.log(sendAssignment);
      setTimeout(() => {
        fetchAssignments(id)
        handleSuccess("data fetched")

      }, 1000);


    } catch (error) {
      console.error("Error adding student:", error);
      const errorMsg = error.response?.data?.error || error.response?.data || error.message;
      toast.error("❌ " + errorMsg);
      handleSuccess("data not fetched")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border p-6 rounded-2xl shadow-xl max-w-2xl mx-auto space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">📘 Add New Assignment</h3>



      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-600 flex items-center gap-2">
          <FaListAlt className="text-purple-500" /> Title
        </label>
        <input
          onChange={handleChange}
          value={title}
          type="text"
          name="title"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="e.g. Algebra Assignment"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-600 flex items-center gap-2">
          <FaBook className="text-green-500" /> Subject
        </label>
        <input
          value={subject}
          type="text"
          name="subject"
          readOnly
          className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 cursor-not-allowed text-gray-600"
          placeholder="Subject will auto-fill"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-600 flex items-center gap-2">
          <FaListAlt className="text-yellow-500" /> Type
        </label>
        <select
          onChange={handleChange}
          value={type}
          name="type"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="Homework">Homework</option>
          <option value="Project">Project</option>
          <option value="Quiz">Quiz</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-600 flex items-center gap-2">
          <FaCalendarAlt className="text-red-500" /> Due Date
        </label>
        <input
          onChange={handleChange}
          value={due_date}
          type="date"
          name="due_date"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-600 flex items-center gap-2">
          <FaAlignLeft className="text-indigo-500" /> Description
        </label>
        <textarea
          onChange={handleChange}
          value={description}
          name="description"
          rows={3}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Write a brief description..."
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-600 flex items-center gap-2">
          <FaCommentDots className="text-pink-500" /> Teacher Remark
        </label>
        <textarea
          onChange={handleChange}
          value={teacher_remark}
          name="teacher_remark"
          rows={2}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Any special notes..."
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-600 flex items-center gap-2">
          <FaCheckCircle className="text-teal-500" /> Status
        </label>
        <select
          onChange={handleChange}
          value={status}
          name="status"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-600 flex items-center gap-2">
          <FaFilePdf className="text-rose-600" /> Upload PDF
        </label>
        <input

          type="file"
          name="pdf"
          accept="application/pdf"
          className="w-full border border-gray-300 px-3 py-2 rounded-lg file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <div className="pt-4">
        <button

          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          🚀 Add Assignment
        </button>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </div>

    </form>
  );
};

export default AssignmentForm;
