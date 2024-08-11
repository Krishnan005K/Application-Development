import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Admin/Interviewer.css';

function Interviewer() {
  const [interviewers, setInterviewers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ id: '', name: '', email: '', password: '', contact: '',roles:'ROLE_INTERVIEWER' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({ id: '', name: '', email: '', password: '', contact: '' });
  const [popup, setPopup] = useState({ show: false, message: '', icon: null });

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
  

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const showPopup = (message, icon) => {
    setPopup({ show: true, message, icon });
    setTimeout(() => {
      setPopup({ show: false, message: '', icon: null });
    }, 5000);
  };

  const handleAddOrEdit = async () => {
    const { id, name, email, password, contact } = formData;
    if (id && name && email && password && contact) {
      if (editingIndex !== null) {
        // Update existing interviewer
        await axios.put(`${apiUrl}/${formData.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
          const updatedInterviewers = [...interviewers];
          updatedInterviewers[editingIndex] = response.data;
          setInterviewers(updatedInterviewers);
          setEditingIndex(null);
          setFormData({ id: '', name: '', email: '', password: '', contact: '' });
          showPopup('Interviewer updated successfully!', faCheck);
        }).catch((error) => {
          console.log(error);
        });
      } else {
        // Add new interviewer
        await axios.post(apiUrl, formData, {
          headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
          setInterviewers([...interviewers, response.data]);
          setFormData({ id: '', name: '', email: '', password: '', contact: '' });
          showPopup('Interviewer added successfully!', faCheck);
        }).catch((error) => {
          console.log(error);
        });
      }
    } else {
      showPopup('All fields must be filled out.', faTimes);
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditFormData(interviewers[index]);
  };

  const handleSaveClick = async () => {
    await axios.put(`${apiUrl}/${editFormData.id}`, editFormData, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      const updatedInterviewers = [...interviewers];
      updatedInterviewers[editingIndex] = response.data;
      setInterviewers(updatedInterviewers);
      setEditingIndex(null);
      setEditFormData({ id: '', name: '', email: '', password: '', contact: '' });
      showPopup('Interviewer updated successfully!', faCheck);
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
    setEditFormData({ id: '', name: '', email: '', password: '', contact: '' });
  };

  const handleDelete = async (index) => {
    if (window.confirm("Are you sure you want to delete this interviewer?")) {
      const interviewerToDelete = interviewers[index];
      await axios.delete(`${apiUrl}/${interviewerToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(() => {
        const updatedInterviewers = interviewers.filter((_, i) => i !== index);
        setInterviewers(updatedInterviewers);
        showPopup('Interviewer deleted successfully!', faTrash);
      }).catch((error) => {
        console.log(error);
      });
    }
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

      <div className="interviewer-form">
        <input type="text" name="id" placeholder="ID" value={formData.id} onChange={handleInputChange} />
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleInputChange} />
        <div className="add-interviewer-button-container">
          <button className="add-interviewer-button" onClick={handleAddOrEdit}>
            <FontAwesomeIcon icon={faPlus} /> {editingIndex !== null ? 'Update Interviewer' : 'Add Interviewer'}
          </button>
        </div>
      </div>

      <table className="interviewer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInterviewers.map((interviewer, index) => (
            <tr key={index}>
              {editingIndex === index ? (
                <>
                  <td><input type="text" name="id" value={editFormData.id} onChange={handleEditInputChange} disabled /></td>
                  <td><input type="text" name="name" value={editFormData.name} onChange={handleEditInputChange} /></td>
                  <td><input type="email" name="email" value={editFormData.email} onChange={handleEditInputChange} /></td>
                  <td><input type="password" name="password" value={editFormData.password} onChange={handleEditInputChange} /></td>
                  <td><input type="text" name="contact" value={editFormData.contact} onChange={handleEditInputChange} /></td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} onClick={handleSaveClick} className="action-icon" />
                    <FontAwesomeIcon icon={faTimes} onClick={handleCancelClick} className="action-icon" />
                  </td>
                </>
              ) : (
                <>
                  <td>{interviewer.id}</td>
                  <td>{interviewer.name}</td>
                  <td>{interviewer.email}</td>
                  <td>{interviewer.password}</td>
                  <td>{interviewer.contact}</td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} onClick={() => handleEditClick(index)} className="action-icon" />
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(index)} className="action-icon" />
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {popup.show && (
        <div className="popup-overlay">
          <div className="popup">
            <FontAwesomeIcon icon={popup.icon} className="popup-icon" />
            <p className="popup-message">{popup.message}</p>
            <button className="popup-close-button" onClick={() => setPopup({ show: false, message: '', icon: null })}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Interviewer;
