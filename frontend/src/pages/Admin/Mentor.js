import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Admin/Mentor.css';

function Mentor() {
  const [mentors, setMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDept, setSearchDept] = useState('');
  const [searchBatch, setSearchBatch] = useState('');
  const [formData, setFormData] = useState({
    id: '', name: '', email: '', password: '', contact: '', dept: '', classBeingMentored: ''
  });
  const [editingMentorId, setEditingMentorId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    id: '', name: '', email: '', password: '', contact: '', dept: '', classBeingMentored: ''
  });

  useEffect(() => {
    // Retrieve the user role from local storage
    const userRole = localStorage.getItem('role');
    if (userRole === 'ROLE_ADMIN' || userRole === 'ROLE_HEAD') {
      fetchMentors();
    } else {
      alert('You do not have permission to view this page.');
    }
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/api/admin/mentors', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMentors(response.data);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleAddOrEdit = async () => {
    const { id, name, email, password, contact, dept, classBeingMentored } = formData;
    if (name && email && password && contact && dept && classBeingMentored) {
      try {
        if (editingMentorId) {
          // Update existing mentor
          await axios.put(`http://127.0.0.1:8080/api/admin/mentors/${id}`, formData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const updatedMentors = mentors.map(mentor => mentor.id === id ? formData : mentor);
          setMentors(updatedMentors);
        } else {
          // Add new mentor
          await axios.post('http://127.0.0.1:8080/api/admin/mentors', formData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          });
          setMentors([...mentors, formData]);
        }
        setFormData({
          id: '', name: '', email: '', password: '', contact: '', dept: '', classBeingMentored: ''
        });
        setEditingMentorId(null);
      } catch (error) {
        console.error('Error adding or updating mentor:', error);
      }
    } else {
      alert('All fields must be filled out.');
    }
  };

  const handleEditClick = (mentor) => {
    setEditingMentorId(mentor.id);
    setEditFormData(mentor);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://127.0.0.1:8080/api/admin/mentors/${editFormData.id}`, editFormData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const updatedMentors = mentors.map(mentor => mentor.id === editFormData.id ? editFormData : mentor);
      setMentors(updatedMentors);
      setEditingMentorId(null);
    } catch (error) {
      console.error('Error updating mentor:', error);
    }
  };

  const handleCancelClick = () => {
    setEditingMentorId(null);
  };

  const handleDelete = async (mentor) => {
    if (window.confirm("Are you sure you want to delete this mentor?")) {
      try {
        await axios.delete(`http://127.0.0.1:8080/api/admin/mentors/${mentor.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const updatedMentors = mentors.filter(m => m.id !== mentor.id);
        setMentors(updatedMentors);
      } catch (error) {
        console.error('Error deleting mentor:', error);
      }
    }
  };

  const filteredMentors = mentors.filter(mentor =>
    (String(mentor.id).includes(searchTerm) ||
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (searchDept ? mentor.dept === searchDept : true) &&
    (searchBatch ? mentor.classBeingMentored === searchBatch : true)
  );

  return (
    <div className="mentor-view">
      <h2>Mentor Management</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by ID, name, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={searchDept} onChange={(e) => setSearchDept(e.target.value)}>
          <option value="">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="CIVIL">CIVIL</option>
          <option value="MECH">MECH</option>
          <option value="EEE">EEE</option>
          <option value="ECE">ECE</option>
        </select>
        <select value={searchBatch} onChange={(e) => setSearchBatch(e.target.value)}>
          <option value="">All Classes</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>

      <div className="mentor-form">
        <input type="text" name="id" placeholder="ID" value={formData.id} onChange={handleInputChange} />
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleInputChange} />
        <input type="text" name="dept" placeholder="Department" value={formData.dept} onChange={handleInputChange} />
        <input type="text" name="classBeingMentored" placeholder="Class Being Mentored" value={formData.classBeingMentored} onChange={handleInputChange} />
        <div className="add-mentor-button-container">
          <button className="add-mentor-button" onClick={handleAddOrEdit}>
            <FontAwesomeIcon icon={faPlus} /> {editingMentorId ? 'Update Mentor' : 'Add Mentor'}
          </button>
        </div>
      </div>

      <table className="mentor-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Contact</th>
            <th>Department</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMentors.map((mentor) => (
            <tr key={mentor.id}>
              {editingMentorId === mentor.id ? (
                <>
                  <td><input type="text" name="name" value={editFormData.name} onChange={handleEditInputChange} /></td>
                  <td><input type="email" name="email" value={editFormData.email} onChange={handleEditInputChange} /></td>
                  <td><input type="password" name="password" value={editFormData.password} onChange={handleEditInputChange} /></td>
                  <td><input type="text" name="contact" value={editFormData.contact} onChange={handleEditInputChange} /></td>
                  <td><input type="text" name="dept" value={editFormData.dept} onChange={handleEditInputChange} /></td>
                  <td><input type="text" name="classBeingMentored" value={editFormData.classBeingMentored} onChange={handleEditInputChange} /></td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} onClick={() => handleSaveClick} className="action-icon" />
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete} className="action-icon" />
                  </td>
                </>
              ) : (
                <>
                  <td>{mentor.id}</td>
                  <td>{mentor.name}</td>
                  <td>{mentor.email}</td>
                  <td>{mentor.password}</td>
                  <td>{mentor.contact}</td>
                  <td>{mentor.dept}</td>
                  <td>{mentor.classBeingMentored}</td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} onClick={() => handleEditClick(mentor)} className='action-icon' />
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(mentor)} className='action-icon'/>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Mentor;
