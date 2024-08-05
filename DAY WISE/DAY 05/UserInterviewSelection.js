import React, { useState } from 'react';
import '../assets/styles/UserInterviewSelection.css';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserSideInterviewSelection = () => {
  const [interviewType, setInterviewType] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
const navigate = useNavigate();
  const handleInterviewTypeChange = (e) => {
    setInterviewType(e.target.value);
  };

  const handleInterviewTimeChange = (e) => {
    setInterviewTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle the submission of interview type and time
    navigate('/mock-interview')
    console.log('Interview Type:', interviewType);
    console.log('Interview Time:', interviewTime);
  };

  return (
    <div className="user-side-interview-selection">
      <h2>Select Interview Type and Time</h2>
      <form onSubmit={handleSubmit} className="interview-selection-form">
        <div className="form-group">
          <label htmlFor="interviewType">Interview Type:</label>
          <select
            id="interviewType"
            value={interviewType}
            onChange={handleInterviewTypeChange}
            className="form-control"
          >
            <option value="">Select Interview Type</option>
            <option value="Technical Round">Technical Round</option>
            <option value="Aptitude Round">Aptitude Round</option>
            <option value="Group Discussion">Group Discussion</option>
            <option value="Behavioral Round">Behavioral Round</option>
            <option value="Mock Presentation">Mock Presentation</option>
            <option value="HR Round">HR Round</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="interviewTime">Interview Time:</label>
          <input
            type="datetime-local"
            id="interviewTime"
            value={interviewTime}
            onChange={handleInterviewTimeChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit"onClick={handleSubmit} className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default UserSideInterviewSelection;
