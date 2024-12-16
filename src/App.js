import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm'; // Make sure this path is correct
import SignUp from './components/auth/SignUp'; // Make sure this path is correct
import Dashboard from './components/dashboard/Dashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import CreateCourse from './components/admin/CreateCourse';
import AddTeacher from './components/admin/AddTeacher';
import AddStudent from './components/admin/AddStudent';

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="add-teacher" element={<AddTeacher />} />
            <Route path="add-student" element={<AddStudent />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
