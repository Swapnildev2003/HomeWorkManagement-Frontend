import React, { useState } from 'react';
import dummyAssignments from '../data/dummyAssignment';
import AssignmentList from '../components/AssignmentList';

const StudentView = () => {
  const [assignments] = useState(dummyAssignments);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Student Dashboard</h2>
      <AssignmentList assignments={assignments} />
    </div>
  );
};

export default StudentView;
