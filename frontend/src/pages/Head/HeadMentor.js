import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import '../../assets/styles/Mentor/MentorStudent.css'; // Assuming you have similar styles for mentors

const apiUrl = 'http://localhost:8080/api/heads';

function HeadMentor() {
  const [mentors, setMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewDetails, setViewDetails] = useState(null);
  const [dept, setDept] = useState('');

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Fetch department of the head
    axios.get(`${apiUrl}/id/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        setDept(response.data.dept); // Assuming response.data has dept field
        return axios.get(`http://localhost:8080/api/mentors/dept/${response.data.dept}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      })
      .then((response) => {
        setMentors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, userId]);

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (mentor) => {
    setViewDetails(mentor);
  };

  const handleClosePopup = () => {
    setViewDetails(null);
  };

  const renderPieChart = (ratings) => {
    const data = {
      labels: ['Ratings', 'Remaining'],
      datasets: [
        {
          label: 'Mentor Ratings',
          data: [ratings, 10 - ratings], // Assuming the maximum rating is 10
          backgroundColor: ['#36A2EB', '#FF6384'],
          hoverBackgroundColor: ['#36A2EB', '#FF6384']
        }
      ]
    };

    return (
      <div className="chart-container">
        <Pie data={data} />
      </div>
    );
  };

  return (
    <div className="mentor-view">
      <h2 className="mentor-title">Mentor Management</h2>
      <input
        type="text"
        placeholder="Search by Name or Email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mentor-search"
      />
      <table className="mentor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Dept</th>
            <th>Class Mentoring</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMentors.map((mentor) => (
            <tr key={mentor.email}>
              <td>{mentor.name}</td>
              <td>{mentor.email}</td>
              <td>{mentor.dept}</td>
              <td>{mentor.classBeingMentored}</td>
              <td>
                <FontAwesomeIcon icon={faEye} className="mentor-action-icon" onClick={() => handleViewDetails(mentor)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {viewDetails && (
        <div className="mentor-popup">
          <h3>Mentor Details</h3>
          <p><strong>Name:</strong> {viewDetails.name}</p>
          <p><strong>Email:</strong> {viewDetails.email}</p>
          <p><strong>Department:</strong> {viewDetails.dept}</p>
          <p><strong>Class Mentoring:</strong> {viewDetails.classBeingMentored}</p>
          
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
    </div>
  );
}

export default HeadMentor;
