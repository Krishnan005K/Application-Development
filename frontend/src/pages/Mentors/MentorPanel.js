import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import MentorProfileImg from '../../assets/images/attend-interview-image.png'; // Update this with the actual path to the mentor's profile image
import MentorStudent from '../Mentors/MentorStudent';
import MentorReports from '../Mentors/MentorReports';
import '../../assets/styles/Mentor/MentorPanel.css'; // Use this CSS file
import MentorProfile from './MentorProfile';
import { useNavigate } from 'react-router-dom';
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
    <div className="mentor-dashboard-container">
      <div className="mentor-side-panel">
        <Link to="/mentordashboard/profile" className="mentor-profile-link">
          <img src={MentorProfileImg} alt="Profile" className="mentor-profile-image" />
        </Link>
        <h2 className="mentor-panel-title">Mentor Panel</h2>
        <nav>
          <ul className="mentor-nav-list">
            <li>
              <Link to="/mentor-dashboard/students" className="mentor-nav-link">
                <i className="fas fa-user-graduate mentor-nav-icon"></i>
                Students
              </Link>
            </li>
            <li>
              <Link to="/mentor-dashboard/reports" className="mentor-nav-link">
                <i className="fas fa-file-alt mentor-nav-icon"></i>
                Reports
              </Link>
            </li>
            
            <Link onClick={handleLogout}>
            <li onClick={handleLogout} style={{ cursor: 'pointer' ,color:"white", fontWeight:"bold", marginLeft:"10px", marginTop:"30px", marginBottom:"30px"}}>
              
                <i className="fas fa-sign-out-alt nav-icon"></i>
                Logout
             
            </li>
            </Link>
           
          </ul>
        </nav>
      </div>
      <div className="mentor-main-content">
        <Routes>
          <Route path="profile" element={<MentorProfile />} />
          <Route path="students" element={<MentorStudent />} />
          <Route path="reports" element={<MentorReports />} />
          <Route path="/" element={<MentorStudent />} />
        </Routes>
      </div>
    </div>
  );
}

export default MentorDashboard;
