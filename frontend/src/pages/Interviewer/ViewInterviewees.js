import React, { useState } from 'react';
import '../../assets/styles/Interviewer/ViewInterviewees.css';

function ViewInterviewees() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roundNumberFilter, setRoundNumberFilter] = useState('');
  const [roundNameFilter, setRoundNameFilter] = useState('');

  const interviewees = [
    { username: 'john_doe', email: 'john@example.com', dob: '1990-01-01', currentRound: '1', roundName: 'Technical Round', currentScore: '85' },
    { username: 'jane_smith', email: 'jane@example.com', dob: '1985-05-05', currentRound: '2', roundName: 'Aptitude Round', currentScore: '90' },
    // More interviewee data here...
  ];

  const filteredInterviewees = interviewees.filter(interviewee => 
    (interviewee.username.includes(searchTerm) || interviewee.email.includes(searchTerm)) &&
    (roundNumberFilter === '' || interviewee.currentRound === roundNumberFilter) &&
    (roundNameFilter === '' || interviewee.roundName === roundNameFilter)
  );

  return (
    <div className="interviewees-view">
      <h2>Interviewee Management</h2>
      <div className="interviewees-filters">
        <input 
          type="text" 
          placeholder="Search interviewees..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Filter by round number..." 
          value={roundNumberFilter} 
          onChange={(e) => setRoundNumberFilter(e.target.value)} 
        />
        <select value={roundNameFilter} onChange={(e) => setRoundNameFilter(e.target.value)}>
          <option value="">All Rounds</option>
          <option value="Technical Round">Technical Round</option>
          <option value="Aptitude Round">Aptitude Round</option>
          <option value="Group Discussion">Group Discussion</option>
          <option value="Behavioral Round">Behavioral Round</option>
          <option value="Mock Presentation">Mock Presentation</option>
          <option value="HR Round">HR Round</option>
        </select>
      </div>
      <div className="interviewees-card-container">
        <div className="interviewees-card full-row-card">
          <h3>Total Interviewees</h3>
          <div className="interviewees-count-circle">{interviewees.length}</div>
        </div>
      </div>
      <table className="interviewees-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Current Round</th>
            <th>Round Name</th>
            <th>Current Score</th>
          </tr>
        </thead>
        <tbody>
          {filteredInterviewees.map((interviewee, index) => (
            <tr key={index}>
              <td>{interviewee.username}</td>
              <td>{interviewee.email}</td>
              <td>{interviewee.dob}</td>
              <td>{interviewee.currentRound}</td>
              <td>{interviewee.roundName}</td>
              <td>{interviewee.currentScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewInterviewees;
