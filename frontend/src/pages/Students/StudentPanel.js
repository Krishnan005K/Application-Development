// StudentDashboard.js
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import StudentProfileImg from '../../assets/images/attend-interview-image.png'; // Update with the actual path to the student's profile image
import Schedules from '../Students/Shedules'; // Placeholder for the Schedules component
import StudentInterviews from '../Students/StudentInterviews'; // Placeholder for the Interviews component
// import Logout from '../../components/Student/Logout'; // Placeholder for the Logout component
import Performance from './Performance';
import '../../assets/styles/Student/StudentPanel.css'; // Use this CSS file
import StudentProfile from './StudentProfile';
import VideoRecord from './VideoRecord';

function StudentDashboard() {
  return (
    <div className="dashboard-container">
      <div className="side-panel">
        <Link to="/studentdashboard/profile" className="profile-link">
          <img src={StudentProfileImg} alt="Profile" className="profile-image" />
        </Link>
        <h2 style={{ marginLeft: '30px' }}>Student Panel</h2>
        <nav>
          <ul>
            <li>
              <Link to="/student-dashboard/schedules">
                <i className="fas fa-calendar-day nav-icon"></i>
                Schedules
              </Link>
            </li>
            <li>
              <Link to="/student-dashboard/interviews">
                <i className="fas fa-calendar-check nav-icon"></i>
                Interviews
              </Link>
            </li>
            <li>
              <Link to="/student-dashboard/performance">
                <i className="fas fa-calendar-check nav-icon"></i>
                Performance
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="fas fa-sign-out-alt nav-icon"></i>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <Routes>
          <Route path="profile" element={<StudentProfile />} />
          <Route path="schedules" element={<Schedules />} />
          <Route path="interviews" element={<StudentInterviews />} />
          <Route path="videointerview" element={<VideoRecord />} />
          <Route path="performance" element={<Performance />} />
          
          {/* <Route path="logout" element={<Logout />} /> */}
          <Route path="/" element={<Performance />} />
        </Routes>
      </div>
    </div>
  );
}

export default StudentDashboard;
