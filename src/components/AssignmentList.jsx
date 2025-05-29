import React from 'react';
import AssignmentCard from './AssignmentCard';

const AssignmentList = ({ assignments }) => {
  return (
    <div>
      {assignments.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} />
      ))}
    </div>
  );
};

export default AssignmentList;
