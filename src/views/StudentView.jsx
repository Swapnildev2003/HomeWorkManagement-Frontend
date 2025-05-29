import React from 'react';

import AssignmentList from '../components/AssignmentList';
import dummyAssignments from '../data/dummyAssignment';


const StudentView = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Student Dashboard</h2>
      <AssignmentList assignments={dummyAssignments} />
    </div>
  );
};

export default StudentView;
