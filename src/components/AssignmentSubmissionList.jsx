import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SubmissionCard from '../components/SubmissionCard';

const AssignmentSubmissionList = ({ subject, handleSubmissionId, handleTeacherId }) => {
  const [submission, setSubmission] = useState([])
  const [state, setState] = useState(false)
  useEffect(() => {
    const student_submissions = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/submissions/")
        const assignment = await axios.get("http://127.0.0.1:8000/api/assignments/")
        const data = res.data
        const result = assignment.data
        console.log(res.data)
        const filter_Submission = data.filter((submission) => {
          if (submission.subject == subject)
            return submission
        })
        const firstMatchingAssignment = result.find(
          (assignment) => assignment.subject === subject
        );
        console.log(filter_Submission)
        handleTeacherId(firstMatchingAssignment.teacher)
        setSubmission(filter_Submission)
        setState(true)
      } catch (error) {
        console.log(error)
      }
    }
    student_submissions()
  }, [])
  return (
    <div>
      {state === true ? (
        submission?.map((submission) => (
          <SubmissionCard handleSubmissionId={handleSubmissionId}  key={submission.id} submission={submission} />
        ))
      ) : (
        <div>Loading.....</div>
      )}
    </div>

  )
}

export default AssignmentSubmissionList
