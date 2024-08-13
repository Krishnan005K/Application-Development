import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../assets/styles/Student/StudentInterviews.css'; // Ensure this path is correct for your CSS file

const StudentInterviews = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleTakeTest = (roundType) => {
    if (roundType === 'Mock Interview') {
      navigate('/student-dashboard/videointerview'); // Navigate to the 'demo' page for HR Round
    } else {
      // Handle other rounds or default behavior
    
    }
  };

  return (
    <div className="schedules-container">
      <h1>My Interviews</h1>
      <div className="card-container">
        <div className="card">
          <h3>Technical Round</h3>
          <p>Prepare for the technical round with coding and problem-solving tasks.</p>
          <button onClick={() => handleTakeTest('Technical Round')} className="take-test-button">
            Take Test
          </button>
        </div>
        <div className="card">
          <h3>Interview Round</h3>
          <p>Prepare for this round with behavioral and situational questions.</p>
          <button onClick={() => handleTakeTest('Mock Interview')} className="take-test-button">
            Take Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentInterviews;
