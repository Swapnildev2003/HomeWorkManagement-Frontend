import React, { useState } from 'react';
import dummyAssignments from '../data/dummyAssignment';
import AssignmentForm from '../components/AssignmentForm';
import AssignmentList from '../components/AssignmentList';

const TeacherView = () => {
  const [assignments, setAssignments] = useState(dummyAssignments);
  const [showForm, setShowForm] = useState(false); 

  const handleAddAssignment = (newAssignment) => {
    setAssignments((prev) => [newAssignment, ...prev]);
    setShowForm(false); 
  };

  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Teacher Dashboard</h2>
        <button
          onClick={handleToggleForm}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {showForm ? 'Cancel' : 'Add Assignment'}
        </button>
      </div>

      {showForm && <AssignmentForm onAdd={handleAddAssignment} />}
      <AssignmentList assignments={assignments} />
    </div>
  );
};

export default TeacherView;
