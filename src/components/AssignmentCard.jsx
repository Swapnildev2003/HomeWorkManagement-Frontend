import React from 'react';

const statusColor = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Completed: 'bg-green-100 text-green-800',
};

const AssignmentCard = ({ assignment }) => {
  const { title, subject, type, dueDate, status } = assignment;

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4 border">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className={`text-sm px-2 py-1 rounded ${statusColor[status]}`}>
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-600">
        <strong>Subject:</strong> {subject}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Type:</strong> {type}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Due Date:</strong> {dueDate}
      </p>
    </div>
  );
};

export default AssignmentCard;
