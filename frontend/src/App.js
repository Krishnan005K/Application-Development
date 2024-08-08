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
import { AuthProvider, useAuth } from './contexts/AuthContext';
import VideoRec from './components/VideoRecord';
import InterviewerDashboardPage from './components/InterviewerDashboard';
import InterviewCreate from './components/InterviewSchedule';
import UserSideInterviewSelection from './components/UserInterviewSelection';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <Router>
      <div>
      
      <Navbar />
      {/* <ProfilePage/> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/register' element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path='/admin-dashboard' element={<Admin />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/user-dashboard' element={<DashboardPage />} /> 
          <Route path='/head-dashboard' element={<DashboardPage />} /> 

          <Route path='/mock-interview' element={<VideoRec/>}/>
          <Route path='/interviewer-dashboard' element={<InterviewerDashboardPage />} />
          <Route path='/mock-interview-schedule' element={<InterviewCreate/>}/>
          <Route path='/user-interview-selection' element={<UserSideInterviewSelection/>}/>
        </Routes>
      </div>
    </Router>
  );
};

const ProfileRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  if (user.role === 'admin') {
    return <Admin />;
  }

  return <ProfilePage />;
};

export default App;
