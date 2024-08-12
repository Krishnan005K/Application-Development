import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Pie } from 'react-chartjs-2';
import '../../assets/styles/Admin/Student.css';

function Student() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const token = localStorage.getItem('token');
  const apiUrl = 'http://127.0.0.1:8080/api/admin/students';

  useEffect(() => {
    axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      setStudents(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [apiUrl, token]);

  const filteredStudents = students.filter(student =>
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     String(student.userId).includes(searchTerm)) &&
    (deptFilter === '' || student.dept === deptFilter)
  );

  const handleViewClick = (student) => {
    setSelectedStudent(student);
  };

  const closePopup = () => {
    setSelectedStudent(null);
  };

  return (
    <div className="student-view">
      <h2>Student Management</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by ID, Name, or Email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
        </select>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Register No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Batch</th>
            <th>Section</th>
            <th>Ratings</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.registerNo}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.dept}</td>
              <td>{student.batch}</td>
              <td>{student.section}</td>
              <td>{student.ratings}</td>
              <td>{student.contact}</td>
              <td>
                <FontAwesomeIcon icon={faEye} onClick={() => handleViewClick(student)} className="action-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStudent && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedStudent.name}'s Details</h3>
            <p>Email: {selectedStudent.email}</p>
            <p>Department: {selectedStudent.dept}</p>
            <p>Batch: {selectedStudent.batch}</p>
            <p>Section: {selectedStudent.section}</p>
            <p>Contact: {selectedStudent.contact}</p>
            <Pie
              data={{
                labels: ['Rating'],
                datasets: [
                  {
                    label: 'Ratings',
                    data: [selectedStudent.ratings, 10 - selectedStudent.ratings],
                    backgroundColor: ['#2f65ad', '#ccc'],
                  }
                ]
              }}
              options={{ responsive: true }}
            />
            <button className="close-button" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Student;
