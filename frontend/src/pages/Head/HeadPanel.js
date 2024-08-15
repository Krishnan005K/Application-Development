import React, { useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import HeadProfileImg from '../../assets/images/attend-interview-image.png';
// import FeedbackHeadDash from './FeedbackHeadDash';
// import ScheduleHeadDashboard from './ScheduleHead';
import HeadProfile from './HeadProfile';
// import HeadStudent from './HeadStudent';
import HeadMentor from './HeadMentor';

import '../../assets/styles/Admin/AdminPanel.css';
import HeadStudent from './HeadStudent';
import HeadChart from './HeadChart';
import HeadSchedule from './HeadSchedule';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function HeadDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      navigate('/login', { replace: true });
      window.history.replaceState(null, "", window.location.origin);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    navigate('/login', { replace: true });
    window.history.replaceState(null, "", window.location.origin);
  };

  const storedEmail = localStorage.getItem('email');
  const storedRole = localStorage.getItem('role');

  return (
    <div className="dashboard-container">
      <div className="side-panel">
        <Link to="/headdashboard/profile" className="profile-link">
          <img src={HeadProfileImg} alt="Profile" className="profile-image" />
        </Link>
        <h2 style={{ marginLeft: '30px' }}>Head Panel</h2>
        <nav>
          <ul>
            <li>
              <Link to="/head-dashboard">
                <i className="fas fa-bell nav-icon"></i>
                OverAll Performance
              </Link>
            </li>
            <li>
              <Link to="/head-dashboard/student-details">
                <i className="fas fa-user nav-icon"></i>
                Student 
              </Link>
            </li>
            <li>
              <Link to="/head-dashboard/mentor-details">
                <i className="fas fa-edit nav-icon"></i>
                Mentors
              </Link>
            </li>
            {/* <li>
              <Link to="/headdashboard/feedback">
                <i className="fas fa-comment-dots nav-icon"></i>
                Feedback
              </Link>
            </li> */}
            <li>
              <Link to="/head-dashboard/schedules">
                <i className="fas fa-calendar nav-icon"></i>
                Schedules
              </Link>
            </li>
            <li>
              <Link 
                to="/login" 
                className="logout-button"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt nav-icon"></i>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <Routes>
          <Route path="profile" element={<HeadProfile />} />
          <Route path="" element={<HeadChart />} />
          <Route path="student-details" element={<HeadStudent />} />
          <Route path="mentor-details" element={<HeadMentor />} />
          <Route path='schedules' element={<HeadSchedule />} />
          {/* <Route path="feedback" element={<FeedbackHeadDash />} /> */}
          {/* <Route path="head-schedules" element={<ScheduleHeadDashboard />} />
          <Route path="reports" element={<Reports />} />
          <Route path="/" element={<HeadCharts />} /> */}
        </Routes>
      </div>
    </div>
  );
}

const Reports = () => (
  <div>
    <h3>Reports Page</h3>
    <p>This is where the reports would be displayed.</p>
  </div>
);

export default HeadDashboard;
