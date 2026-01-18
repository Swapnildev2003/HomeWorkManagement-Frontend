import React, { use, useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import AssignmentForm from '../components/AssignmentForm';
import AssignmentList from '../components/AssignmentList';
import AddTeacherForm from '../components/AddTeacher';
import axios from 'axios';
const TeacherView = ({ role }) => {
  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [state, setState] = useState(false)
  const [id, setId] = useState('')
  const [name, setName] = useState('')

  const [success, setSuccess] = useState(false)
  const [subject, setSubject] = useState('')

  const handleSubject = (val) => {
    setSubject(val)
  }
  console.log(success)

  const fetchAssignments = async (id) => {
    console.log(id, "ye lo id")
    try {

      const response = await axios.get(`http://15.135.83.103:8000/api/assignments/`);
      const data = response.data
      const unique_assignment = data.filter((e) => e.teacher == id)
      setAssignments(unique_assignment)
      console.log(unique_assignment)
      //  setAssignments(unique_assignment)



    } catch (err) {
      console.log(err)
      setError('Failed to fetch assignments');
      setLoading(false);
    }
  };




  const handleSuccess = (value) => {
    setSuccess(value)
  }
  const handleChange = () => {
    setState((prev) => !prev)
  }
  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
    console.log("hi")
  };
  const handleId = (id) => {
    setId(id)
    fetchAssignments(id);
  }


  const handleTeacherName = (name) => {
    setName(name)
    console.log(name)
  }


  return (
    <> {state == false ? (<AddTeacherForm handleName={handleTeacherName} handleId={handleId} state={state} change={handleChange} />) : (
      <div className="relative text-left">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-4xl font-semibold">Teacher Dashboard:</h2>
          <button
            onClick={handleToggleForm}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mr-20"
          >
            Add Assignment
          </button>
        </div>



        {showForm && (
          <div className="scrollbar-hide  fixed inset-0 z-50  backdrop-blur-sm flex items-center justify-center px-4 ">
            <div className="relative bg-white w-full max-w-2xl p-6 rounded-2xl shadow-lg max-h-[90vh] overflow-y-auto">

              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
              >
                <FaTimes size={25} onClick={() => setShowForm()} />
              </button>
              <AssignmentForm handleSubject={handleSubject} fetchAssignments={fetchAssignments} handleSuccess={handleSuccess} name={name} id={id} formState={handleToggleForm} />
            </div>
          </div>
        )}

        <AssignmentList role={role} assignments={assignments} />
      </div>)}
    </>)
};

export default TeacherView;
