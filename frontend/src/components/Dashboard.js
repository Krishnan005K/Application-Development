import React, { useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../assets/styles/Dashboard.css';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <div className="dashboard-page">
      <h1 className='dashboard-title'><button className='attend-interview-button'><Link to='/user-interview-selection'>Attend Your Mock Interviews Now</Link></button> </h1>
      <h1 className="dashboard-title">User Dashboard</h1>
      <div className="user-details">
        <h2>Hello {user?.name}  👋 </h2>
        <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
        <p><strong>Mobile:</strong> {user?.mobile || 'N/A'}</p>
        <p><strong>Degree:</strong> {user?.degree || 'N/A'}</p>
        <p><strong>Skills:</strong> {user?.skills?.join(', ') || 'N/A'}</p>
        <p><strong>Edit or Update </strong><button className='profile-button'><Link to="/profile">Profile</Link></button></p>
      </div>
      <div className="dashboard-section">
        <h2>Insights</h2>
        <div className="insights-cards">
          <div className="insights-card">
            <h3>Overall Rating</h3>
            <p>{user?.insights?.overallRating || 'N/A'}</p>
          </div>
          <div className="insights-card">
            <h3>Interviews Completed</h3>
            <p>{user?.insights?.interviewsCompleted || 'N/A'}</p>
          </div>
          <div className="insights-card">
            <h3>Interviews Scheduled</h3>
            <p>{user?.insights?.interviewsScheduled || 'N/A'}</p>
          </div>
        </div>
      </div>
      <div className="dashboard-section">
        <h2>Performance</h2>
        <div className="performance-details">
          <div className="performance-card">
            <h3>Technical Skills</h3>
            <p>{user?.performance?.technicalSkills || 'N/A'}</p>
          </div>
          <div className="performance-card">
            <h3>Communication Skills</h3>
            <p>{user?.performance?.communicationSkills || 'N/A'}</p>
          </div>
          <div className="performance-card">
            <h3>Problem-Solving Skills</h3>
            <p>{user?.performance?.problemSolvingSkills || 'N/A'}</p>
          </div>
        </div>
      </div>
      <div className="dashboard-section">
        <h2>Upcoming Interviews</h2>
        <div className="upcoming-interviews">
          {user?.upcomingInterviews?.length > 0 ? (
            user.upcomingInterviews.map((interview, index) => (
              <div className="interview-card" key={index}>
                <h3>{interview.company}</h3>
                <p>Date: {interview.date}</p>
                <p>Position: {interview.position}</p>
              </div>
            ))
          ) : (
            <p>No upcoming interviews.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
