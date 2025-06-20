import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaUserTie, FaBook, FaClipboardList } from 'react-icons/fa';
import AssignmentCard from "./AssignmentCard";
import StudentSubmission from '../components/Submission';
import TeacherReviewForm from './TeacherReview';
import AssignmentSubmissionList from './AssignmentSubmissionList';
const AssignmentList = ({ handleResponse, role, assignments = [], StudentRoll }) => {
  const [showFilters, setShowFilters] = useState(false);
  let [state, setState] = useState("assignment")
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [id, setId] = useState('')
  const [subject, setSubject] = useState('')
  const [teacher_id, set_teacher_id] = useState('')
  const [submissionId, setSubmissionId] = useState('')
  const [countCards, setCountCards] = useState(0)
  const [change, setChange] = useState(false);
  const entries = 10;
  const No_of_Pages = Math.ceil(countCards / entries)

  const handleTeacherId = (val) => {
    set_teacher_id(val)
  }
  const handleSubmissionId = (val) => {
    setSubmissionId(val)
  }
  const handleId = (val) => {
    console.log(val, "id")
    setId(val)

  }
  const handleSubject = (val) => {
    console.log(val, "id")
    setSubject(val)

  }
  useEffect(() => {
    if (data) {
      setChange(true)
      console.log(data)
    }
  }, [data])

  const setpages = (id=0) => {
    const start_id = parseInt(id) * entries;
    const end_id = (parseInt(id) + 1) * entries;
    let current_Data = []
    for (let i = start_id; i < end_id; i++) {
      if (assignments[i])
        current_Data = [...current_Data, assignments[i]]

    }
    console.log(start_id, end_id)
    setData(current_Data)
    console.log(current_Data,"my_data")
  }


  const [filterValues, setFilterValues] = useState({
    status: '',
    subject: '',
    type: '',
    student: '',
    teacher: ''
  });

  useEffect(() => {
    setData(assignments)
    setCountCards(assignments.length)

    console.log(countCards, "this is your card count");
    setpages()
  }, [assignments])
  const handleChange = (value) => {
    setState(value)

  }
  const handleSearch = (e) => {
    const data = e.target.value

    console.log(data)
    setSearch(data)
    const filterData = assignments.filter((e) => {
      if (e.title.includes(data)) {
        return e;
      }
    })
    console.log(filterData)
    setData(filterData)

  }

  const handleFilterValue = (e) => {

    const { name, value } = e.target;

    const updatedFilters = {
      ...filterValues,
      [name]: value
    };
    setFilterValues(updatedFilters);
    const filteredData = assignments.filter(item =>
      Object.entries(updatedFilters).every(([key, val]) =>
        val === '' || item[key] == val
      )
    );

    setData(filteredData);
  }
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold mb-4 text-gray-800">HomeWork / Assignments</h2>


      <div className="flex justify-start mb-10 gap-4">
        <button onClick={() => { handleChange("assignment"), handleResponse() }} className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-md hover:scale-105 transition">
          📄 Assignments
        </button>
        {role == "Student" && <button onClick={() => { handleChange("submission") }} className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-md hover:scale-105 transition">
          📝 Submissions
        </button>} <div><button onClick={() => { handleChange("student_submission") }} className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-md hover:scale-105 transition">
          📝 Student Submissions
        </button>{role == "Teacher" && <button onClick={() => { handleChange("review") }} className="px-6 py-2 rounded-full ml-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-md hover:scale-105 transition">
          📝 Review
        </button>}</div>

      </div>


      {(state == 'assignment' || state == "student_submission") && (<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div className="relative flex-grow">
          <FaSearch className="absolute top-3 left-3 text-gray-400 text-lg" />
          <input
            onChange={handleSearch}
            value={search}
            type="text"
            placeholder="Search by title..."
            className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-300 shadow-sm
                       focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600
                     text-white font-semibold px-5 py-3 rounded-full shadow-lg hover:from-indigo-700 hover:to-blue-700
                     focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-transform transform active:scale-95"
        >
          <FaFilter className="text-xl" />
          <span className="text-lg">Filters</span>
        </button>
      </div>)}


      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10
                        bg-white p-6 rounded-2xl shadow-xl border border-gray-200 animate-fadeIn">
          <div className="flex items-center gap-3 bg-blue-50 rounded-lg px-4 py-3 shadow-inner">
            <FaFilter className="text-blue-500 text-xl" />
            <select className="w-full bg-transparent border-none focus:ring-0 text-blue-700 font-medium cursor-pointer" defaultValue="">
              <option value="" disabled>Status</option>
              <option value="Pending">Pending</option>
              <option value="Submitted">Submitted</option>
              <option value="Reviewed">Reviewed</option>
            </select>
          </div>

          <div className="flex items-center gap-3 bg-purple-50 rounded-lg px-4 py-3 shadow-inner">
            <FaBook className="text-purple-500 text-xl" />
            <select name="subject" onChange={handleFilterValue} className="w-full bg-transparent border-none focus:ring-0 text-purple-700 font-medium cursor-pointer" defaultValue="">
              <option value="" disabled>Subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="operatiing system">Hindi</option>
            </select>
          </div>

          <div className="flex items-center gap-3 bg-indigo-50 rounded-lg px-4 py-3 shadow-inner">
            <FaClipboardList className="text-indigo-500 text-xl" />
            <select name="type" onChange={handleFilterValue} className="w-full bg-transparent border-none focus:ring-0 text-indigo-700 font-medium cursor-pointer" defaultValue="">
              <option value="" disabled>Type</option>
              <option value="homework">homework</option>
              <option value="Lab Work">Lab Work</option>
              <option value="Essay">Essay</option>
            </select>
          </div>

          {role === 'Teacher' ? (
            <div className="flex items-center gap-3 bg-teal-50 rounded-lg px-4 py-3 shadow-inner">
              <FaUserTie className="text-teal-500 text-xl" />
              <select name="student" onChange={handleFilterValue} className="w-full bg-transparent border-none focus:ring-0 text-teal-700 font-medium cursor-pointer" defaultValue="">
                <option value="" disabled>Student</option>
                <option value="1">Student 1</option>
                <option value="2">Student 2</option>
              </select>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-teal-50 rounded-lg px-4 py-3 shadow-inner">
              <FaUserTie className="text-teal-500 text-xl" />
              <select name="teacher" onChange={handleFilterValue} className="w-full bg-transparent border-none focus:ring-0 text-teal-700 font-medium cursor-pointer" defaultValue="">
                <option value="" disabled>Teacher</option>
                <option value="1">Teacher 1</option>
                <option value="2">Teacher 2</option>
              </select>
            </div>
          )}
        </div>
      )}

      {state === "assignment" ? (
        data.length>0 ? (
          data.map((dataItem) => (
            <AssignmentCard
              key={dataItem.id}
              assignment={dataItem}
              handleId={handleId}
              handleSubject={handleSubject}
            />
          ))
        ) : (
          <div className="text-center text-gray-600 text-lg mt-6">Loading...</div>
        )
      ) : role === "Student" ? (
        state === "submission" ? (
          <StudentSubmission
            id={id}
            subject={subject}
            StudentRoll={StudentRoll}
          />
        ) : (
          <AssignmentSubmissionList
            handleSubmissionId={handleSubmissionId}
            handleTeacherId={handleTeacherId}
            subject={subject}
          />
        )
      ) : state === "review" ? (
        <TeacherReviewForm
          submissionId={submissionId}
          teacher_id={teacher_id}
        />
      ) : (
        <AssignmentSubmissionList
          handleSubmissionId={handleSubmissionId}
          handleTeacherId={handleTeacherId}
          subject={subject}
        />
      )}

      <div className='flex flex-wrap gap-2 justify-center mt-6'>
        {Array.from({ length: No_of_Pages }, (_, index) => (
          <button
            key={index}
            onClick={() => setpages(index)}
            className='px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 transition'
          >
            {index + 1}
          </button>
        ))}
      </div>


     
    </div>
  );
};

export default AssignmentList;
