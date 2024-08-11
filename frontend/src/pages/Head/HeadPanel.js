import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import HeadProfileImg from '../../assets/images/attend-interview-image.png'; // Update this with the actual path to the head's profile image


import '../../assets/styles/Head/HeadPanel.css'; // Use this CSS file
import HeadMentor from './HeadMentor';
import HeadInterviewer from './HeadInterviewer';
import HeadStudent from './HeadStudent';
import HeadReports from './HeadReports';
import ProfileHead from './HeadProfile';

function HeadDashboard() {
  return (
    <div className="dashboard-container">
      <div className="side-panel">
        <Link to="/head-dashboard/profile" className="profile-link">
          <img src={HeadProfileImg} alt="Profile" className="profile-image" />
        </Link>
        <h2 style={{ marginLeft: '30px' }}>Head Panel</h2>
        <nav>
          <ul>
            <li>
              <Link to="/head-dashboard/mentor">
                <i className="fas fa-user-graduate nav-icon"></i>
                Mentor
              </Link>
            </li>
            <li>
              <Link to="/head-dashboard/interviewer">
                <i className="fas fa-users nav-icon"></i>
                Interviewer
              </Link>
            </li>
            <li>
              <Link to="/head-dashboard/student">
                <i className="fas fa-user-graduate nav-icon"></i>
                Students
              </Link>
            </li>
            <li>
              <Link to="/head-dashboard/reports">
                <i className="fas fa-file-alt nav-icon"></i>
                Reports
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
          <Route path="profile" element={<ProfileHead />} />
          <Route path="mentor" element={< HeadMentor/>} />
          <Route path="interviewer" element={<HeadInterviewer />} />
          <Route path="student" element={<HeadStudent />} />
          <Route path="reports" element={<HeadReports />} />
          <Route path="/" element={<HeadMentor />} />
        </Routes>
      </div>
    </div>
  );
}

export default HeadDashboard;
