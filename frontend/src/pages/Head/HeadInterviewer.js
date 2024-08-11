import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Admin/Interviewer.css';

function Interviewer() {
  const [interviewers, setInterviewers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [popup, setPopup] = useState({ show: false, interviewer: null });

  const token = localStorage.getItem('token');
  const apiUrl = 'http://127.0.0.1:8080/api/admin/interviewers';

  useEffect(() => {
    axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      setInterviewers(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [apiUrl, token]);

  const filteredInterviewers = interviewers.filter(interviewer =>
    (String(interviewer.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(interviewer.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(interviewer.email).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleViewDetails = (interviewer) => {
    setPopup({ show: true, interviewer });
  };

  const closePopup = () => {
    setPopup({ show: false, interviewer: null });
  };

  return (
    <div className="interviewer-view">
      <h2>Interviewer Management</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search interviewers by ID, Name, or Email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="interviewer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInterviewers.map((interviewer, index) => (
            <tr key={index}>
              <td>{interviewer.id}</td>
              <td>{interviewer.name}</td>
              <td>{interviewer.email}</td>
              <td>{interviewer.contact}</td>
              <td>
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  onClick={() => handleViewDetails(interviewer)}
                  className="action-icon"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popup.show && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Interviewer Details</h3>
            <p><strong>ID:</strong> {popup.interviewer.id}</p>
            <p><strong>Name:</strong> {popup.interviewer.name}</p>
            <p><strong>Email:</strong> {popup.interviewer.email}</p>
            <p><strong>Contact:</strong> {popup.interviewer.contact}</p>
            <button className="popup-close-button" onClick={closePopup}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Interviewer;
