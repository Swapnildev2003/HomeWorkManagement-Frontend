import React from 'react';
import dummyAssignments from '../data/dummyAssignments';
import AssignmentList from '../components/AssignmentList';

const TeacherView = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Teacher Dashboard</h2>
      <AssignmentList assignments={dummyAssignments} />
    </div>
  );
};

export default TeacherView;
