import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import MentorProfileImg from '../../assets/images/attend-interview-image.png'; // Update this with the actual path to the mentor's profile image
import MentorStudent from '../Mentors/MentorStudent';
import MentorReports from '../Mentors/MentorReports';
import '../../assets/styles/Mentor/MentorPanel.css'; // Use this CSS file
import MentorProfile from './MentorProfile';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function MentorDashboard() {
const navigate = useNavigate();
const logout = () => {
  localStorage.removeItem('token');
};
const handleLogout = () => {
  logout();
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('email');
  localStorage.removeItem('userId');
  navigate('/');
};
  return (
    <>
    <Navbar/>
    <div className="dashboard-container">
      <div className="side-panel">
        <Link to="/mentor-dashboard/profile" className="profile-link">
          <img src={MentorProfileImg} alt="Profile" className="profile-image" />
        </Link>
        <h2 className="panel-title">Mentor Panel</h2>
        <nav>
          <ul>
            <li>
              <Link to="/mentor-dashboard/students" className="nav-link">
              <i className="fas fa-user nav-icon"></i>
                Students
              </Link>
            </li>
            <li>
              <Link to="/mentor-dashboard/reports" className="nav-link">
                <i className="fas fa-file-alt mentor-nav-icon"></i>
                Reports
              </Link>
            </li>
            
            <li >
            <Link onClick={handleLogout}>
              
            <i className="fas fa-sign-out-alt nav-icon"></i>
                Logout
             
            </Link>
            </li>
           
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <Routes>
          <Route path="profile" element={<MentorProfile />} />
          <Route path="students" element={<MentorStudent />} />
          <Route path="reports" element={<MentorReports />} />
          <Route path="/" element={<MentorStudent />} />
        </Routes>
      </div>
    </div>
    </>
  );
}

export default MentorDashboard;
