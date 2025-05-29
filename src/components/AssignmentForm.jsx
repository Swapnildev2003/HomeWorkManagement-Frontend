import React, { useState } from 'react';

const AssignmentForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    type: 'Homework',
    dueDate: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, subject, dueDate } = formData;
    if (!title || !subject || !dueDate) {
      setError('Please fill in all fields.');
      return;
    }

    onAdd({ ...formData, id: Date.now(), status: 'Pending' });
    setFormData({ title: '', subject: '', type: 'Homework', dueDate: '' });
    setError('');
    setSuccess(true);

    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-4">Add New Assignment</h3>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          name="title"
          className="w-full border px-3 py-2 rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Subject</label>
        <input
          type="text"
          name="subject"
          className="w-full border px-3 py-2 rounded"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Type</label>
        <select
          name="type"
          className="w-full border px-3 py-2 rounded"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="Homework">Homework</option>
          <option value="Project">Project</option>
          <option value="Quiz">Quiz</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Due Date</label>
        <input
          type="date"
          name="dueDate"
          className="w-full border px-3 py-2 rounded"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
      </div>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      {success && <p className="text-green-600 text-sm mb-2">Assignment added successfully!</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Assignment
      </button>
    </form>
  );
};

export default AssignmentForm;
