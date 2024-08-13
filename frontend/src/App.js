// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import './assets/styles/Navbar.css'; // Importing Navbar CSS
import Login from './components/Login';
import Admin from './components/Admin'
import Register from './components/Register';
import SignUp from './components/SignUpForm';
import HomePage from './pages/HomePage';
import ForgotPassword from './components/ForgotPassword';
import ProfilePage from './components/ProfilePage';
import DashboardPage from './components/Dashboard';
import InterviewerDashboardPage from './components/InterviewerDashboard';
import InterviewCreate from './components/InterviewSchedule';
import UserSideInterviewSelection from './components/UserInterviewSelection';
import Interviewer from './components/Interviewer';
import InterviewForm from './pages/Interviewer/InterviewForm';
import AdminDashboard from './pages/Admin/AdminPanel';
import StudentDashboard from './pages/Students/StudentPanel';
import MentorPanel from './pages/Mentors/MentorPanel';
import HeadDashboard from './pages/Head/HeadPanel';
import InterviewerDashboard from './pages/Interviewer/InterviewerDashboard';
import { ToastContainer } from 'react-toastify';
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <Router>
      <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Navbar />
      {/* <ProfilePage/> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path='/admindashboard/*' element={<AdminDashboard />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/user-dashboard' element={<DashboardPage />} /> 
          <Route path='/interviewr' element={<Interviewer/>}/>
          <Route path='/student-dashboard/*' element={<StudentDashboard />} />
          <Route path='/mentor-dashboard/*' element={<MentorPanel />} />
          <Route path='/mock-interview-schedule' element={<InterviewCreate/>}/>
          <Route path='/user-interview-selection' element={<UserSideInterviewSelection/>}/>
          <Route path='/head-dashboard/*' element={<HeadDashboard />} />
          <Route path='/interviewer-dashboard/*' element={<InterviewerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};



export default App;
