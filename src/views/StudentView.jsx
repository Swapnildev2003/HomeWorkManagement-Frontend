import React, { useEffect, useState } from 'react';

import AssignmentList from '../components/AssignmentList';
import AddStudentForm from '../components/AddStudentForm';
import axios from 'axios';
import { use } from 'react';

const StudentView = ({ role, data }) => {
  const [assignments, setAssignments] = useState([]);
  const [state, setState] = useState(!false)
  const [roll, setRoll] = useState('')
  const [response, setResponse] = useState(false)
  const handleResponse = () => {
    setResponse((prev) => !prev)
  }
  const handleRoll = (value) => {
    console.log(value, "my name is")
    setRoll((prev) => prev = value)

  }

  useEffect(() => {
    const fetchAssignments = async () => {

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/assignments/`);
        setAssignments(response.data)
      } catch (err) {
        console.log(err)
        setError('Failed to fetch assignments');
        setLoading(false);
      }
    };
    fetchAssignments()
  }, [response])
  const handleChange = () => {
    setState((prev) => !prev)
  }
  console.log(data)
  return (
    state == true ? <AddStudentForm handleRoll={handleRoll} change={handleChange} /> :
      <div className='text-left'>
        <h2 className="text-4xl font-semibold mb-4">Student Dashboard:</h2>
        {<AssignmentList handleResponse={handleResponse} StudentRoll={roll} role={role} assignments={assignments} />}
      </div>
  );
};

export default StudentView;
