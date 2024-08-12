import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import '../../assets/styles/Mentor/MentorStudent.css';

const apiUrl = 'http://localhost:8080/api/mentors';

function MentorStudent() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewDetails, setViewDetails] = useState(null);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/students/mentor/mentorId/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      setStudents(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [token, userId]);

  const filteredStudents = students.filter(student =>
    student.registerNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (student) => {
    setViewDetails(student);
  };

  const handleClosePopup = () => {
    setViewDetails(null);
  };

  const renderPieChart = (ratings) => {
    const data = {
      labels: ['Ratings'],
      datasets: [
        {
          label: 'Student Ratings',
          data: [ratings, 10 - ratings],
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
    <div className="student-view">
      <h2 className="mentor-student-title">Student Management</h2>
      <input
        type="text"
        placeholder="Search by ID, Name, or Email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mentor-student-search"
      />
      <table className="mentor-student-table">
        <thead>
          <tr>
            <th>Register No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Dept</th>
            <th>Batch</th>
            <th>Section</th>
            <th>Ratings</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.registerNo}>
              <td>{student.registerNo}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.dept}</td>
              <td>{student.batch}</td>
              <td>{student.section}</td>
              <td>{student.ratings}</td>
              <td>{student.contact}</td>
              <td>
                <FontAwesomeIcon icon={faEye} className="mentor-student-action-icon" onClick={() => handleViewDetails(student)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {viewDetails && (
        <div className="student-popup">
          <h3>Student Details</h3>
          <p><strong>Register No:</strong> {viewDetails.registerNo}</p>
          <p><strong>Name:</strong> {viewDetails.name}</p>
          <p><strong>Email:</strong> {viewDetails.email}</p>
          <p><strong>Department:</strong> {viewDetails.dept}</p>
          <p><strong>Batch:</strong> {viewDetails.batch}</p>
          <p><strong>Section:</strong> {viewDetails.section}</p>
          <p><strong>Ratings:</strong> {viewDetails.ratings}</p>
          {renderPieChart(viewDetails.ratings)}
          <p><strong>Contact:</strong> {viewDetails.contact}</p>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
    </div>
  );
}

export default MentorStudent;
