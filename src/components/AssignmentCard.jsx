import React from 'react';
import {
  FaBook,
  FaClock,
  FaFileAlt,
  FaUserTie,
  FaFilePdf,
} from 'react-icons/fa';
import { MdAssignmentTurnedIn } from 'react-icons/md';

const statusStyles = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Submitted: 'bg-blue-100 text-blue-800',
  Reviewed: 'bg-green-100 text-green-800',
};

const AssignmentCard = ({ assignment, handleId, handleSubject }) => {
  const {
    id,
    title,
    subject,
    type,
    due_date,
    status,
    description,
    teacher_remark,
    pdf,
  } = assignment;

  return (
    <div onClick={() => {
      handleId(id), handleSubject(subject)
    }} className="bg-white shadow-md hover:shadow-lg transition rounded-lg p-6 mb-6 border border-gray-200">

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
          <MdAssignmentTurnedIn className="text-blue-500 text-2xl" />
          {title}
        </h3>
        {status && (
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}
          >
            {status}
          </span>
        )}
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
        <div className="flex items-center gap-2">
          <FaBook className="text-purple-600" />
          <span><strong>Subject:</strong> {subject}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaFileAlt className="text-indigo-600" />
          <span><strong>Type:</strong> {type}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="text-rose-500" />
          <span><strong>Due Date:</strong> {due_date}</span>
        </div>
        {pdf && (
          <div className="flex items-center gap-2">
            <FaFilePdf className="text-red-600" />
            <a
              href={'http://15.135.83.103:8000' + pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              View Assignment PDF
            </a>
          </div>
        )}
      </div>
      {/* C:\Users\Dell\Desktop\homeWork-Management-System\backend\media\assignments\pdfs */}

      {(description || teacher_remark) && (
        <div className="mt-4 border-t pt-4 space-y-2">
          {description && (
            <div className="flex items-start gap-2">
              <span className="text-yellow-600 text-xl">🗒️</span>
              <p><strong>Description:</strong> {description}</p>
            </div>
          )}
          {teacher_remark && (
            <div className="flex items-start gap-2">
              <span className="text-green-600 text-xl">💬</span>
              <p className="italic"><strong>Remark:</strong> {teacher_remark}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssignmentCard;
