import React from 'react';
import dummyAssignments from '../data/dummyAssignments';
import AssignmentList from '../components/AssignmentList';

const StudentView = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Student Dashboard</h2>
      <AssignmentList assignments={dummyAssignments} />
    </div>
  );
};

export default StudentView;
