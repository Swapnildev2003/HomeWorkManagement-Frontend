import React, { useState } from 'react';
import RoleToggle from './components/RoleToggle';
import TeacherView from './views/TeacherView';
import StudentView from './views/StudentView';

function App() {
  const [role, setRole] = useState('Student');

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Homework Management System</h1>
      <RoleToggle role={role} setRole={setRole} />
      <div className="mt-8">
        {role === 'Teacher' ? <TeacherView /> : <StudentView />}
      </div>
    </div>
  );
}

export default App;
