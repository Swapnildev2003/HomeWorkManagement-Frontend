import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Navbar */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Homework Manager</h1>
          <nav className="space-x-4">
            <a href="#" className="text-gray-700 hover:text-blue-500">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-500">About</a>
            <a href="#" className="text-gray-700 hover:text-blue-500">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 bg-blue-50">
        <h2 className="text-4xl font-bold mb-4">Welcome to Homework Management System</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Easily manage and track homework, assignments, and tasks for teachers and students.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </section>

      {/* Cards Section */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid gap-6 md:grid-cols-3">
        {["Assignments", "Submissions", "Analytics"].map((title, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">{title}</h3>
            <p className="text-gray-600">
              Manage all your {title.toLowerCase()} in one place.
            </p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm border-t">
        &copy; {new Date().getFullYear()} Homework Manager. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
