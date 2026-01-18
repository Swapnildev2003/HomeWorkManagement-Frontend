import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  FaUserGraduate,
  FaClock,
  FaCommentDots,
  FaFilePdf,
  FaBook,
} from 'react-icons/fa';

const submissionStatusStyles = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Submitted: 'bg-blue-100 text-blue-800',
  Reviewed: 'bg-green-100 text-green-800',
};



const SubmissionCard = ({ submission, handleSubmissionId }) => {

  const {
    id,
    assignment,
    student,
    status,
    student_remark,
    subject,
    submitted_at,
    submitted_file,
  } = submission;
  const [phoneno, setPhoneno] = useState(NaN)
  const [change, setchange] = useState(false)
  console.log(submission)

  useEffect(() => {
    const handlePhoneNo = async () => {
      try {
        const data = await axios.get(`http://15.135.83.103:8000/api/students/${student}/`)
        console.log(data, "ye lo phone number")
        setPhoneno(data.data.phone_number)
      } catch (error) {
        console.log(error)
      }

    }
    handlePhoneNo()

  }, [])

  useEffect(() => {
    console.log(phoneno, "ye lo phone number")
    if (phoneno)

      setchange(true)
  }, [phoneno])
  return (
    <div onClick={() => {
      handleSubmissionId(id)
    }} className="bg-white shadow-md hover:shadow-lg transition rounded-lg p-6 mb-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
          📝 Submission #{id}
        </h3>
        {status && (
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${submissionStatusStyles[status] || 'bg-gray-100 text-gray-800'}`}
          >
            {status}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
        <div className="flex items-center gap-2">
          <FaUserGraduate className="text-purple-600" />
          <span><strong>Student ID:</strong> {student}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaBook className="text-blue-600" />
          <span><strong>Subject:</strong> {subject}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="text-red-500" />
          <span><strong>Submitted At:</strong> {submitted_at}</span>
        </div>
        {submitted_file && (
          <div className="flex items-center gap-2">
            <FaFilePdf className="text-red-600" />
            <a
              href={'http://15.135.83.103:8000' + submitted_file}

              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
              download={submitted_file.split('/').pop()}
            >
              View Submitted File
            </a>
          </div>
        )}
        {change == true ? (<div className="flex items-center gap-2">
          <FaClock className="text-red-500" />
          <a
            href={`https://wa.me/91${phoneno}?text=${encodeURIComponent(
              `This is your attachment.\nHere is your PDF: ${submitted_file}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Send Pdf
          </a>

        </div>) : (<div>dfd</div>)}
      </div>

      {student_remark && (
        <div className="mt-4 border-t pt-4">
          <div className="flex items-start gap-2">
            <FaCommentDots className="text-green-500" />
            <p><strong>Student Remark:</strong> {student_remark}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionCard;

