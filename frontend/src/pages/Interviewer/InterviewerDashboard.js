import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';


import InterviewerProfileImg from '../../assets/images/attend-interview-image.png';
import '../../assets/styles/Interviewer/InterviewerDashboard.css';
import InterviewCreate from '../../components/InterviewSchedule';
import InterviewerStudent from './InterviewerStudent'
import InterviewerProfile from './InterviewerProfile';
import ViewInterviewees from './ViewInterviewees';
import InterviewForm from './InterviewForm';
import InterviewsManager from './InterviewsManager';
import Navbar from '../../components/Navbar';

import { useNavigate } from 'react-router-dom';

function InterviewerDashboard() {
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
        <Link to="/interviewer-dashboard/profile" className="profile-link">
          <img src={InterviewerProfileImg} alt="Profile" className="profile-image" />
        </Link>
        <h2 style={{marginLeft:'30px'}}>Interviewer Panel</h2>
        <nav>
          <ul>
            <li>
              <Link to="/interviewer-dashboard/">
                <i className="fas fa-bell nav-icon"></i>
                Notifications
              </Link>
            </li>
           
            <li>
              <Link to="/interviewer-dashboard/schedules">
                <i className="fas fa-tasks nav-icon"></i>
                Interview
              </Link>
            </li>
           
            <li>
              <Link to="/interviewer-dashboard/students">
                <i className="fas fa-user nav-icon"></i>
                Students
              </Link>
            </li>
            {/* <li>
              <Link to="/interviewer-dashboard/reports">
                <i className="fas fa-user nav-icon"></i>
                Reports
              </Link>
            </li> */}
            <li>
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
          <Route path="profile" element={<InterviewerProfile />} />
          <Route path="notifications" element={<DefaultContent />} />
          <Route path="view-interviews" element={<ViewInterviewees />} />
          <Route path="students" element={<InterviewerStudent />} />
          <Route path="schedules" element={<InterviewsManager />} />
          <Route path="/" element={<DefaultContent />} />
        </Routes>
      </div>
    </div>
    </>
  );
}

const DefaultContent = () => (
  <div className="card-container">
    <div className="card notification-card">
      <h3>Notifications</h3>
      <p><strong>System Update:</strong> The system will undergo maintenance on Friday at 3 PM.</p>
      <p><strong>New Interview:</strong> A new interview has been scheduled. Check the interview management section for details.</p>
    </div>
    <div className="card update-card">
      <h3>Daily Updates</h3>
      <p><strong>Today’s Tasks:</strong> Review new assignments, check interview schedules, and update interview notes.</p>
      <p><strong>Pending Actions:</strong> Approve new interview requests and verify interview details.</p>
    </div>
    <div className="card stats-card">
      <h3>Statistics</h3>
      <p><strong>Total Interviews:</strong> 50</p>
      <p><strong>Upcoming Interviews:</strong> 5</p>
      <p><strong>Recent Feedback:</strong> 10 new feedbacks</p>
    </div>
  </div>
);


export default InterviewerDashboard;
