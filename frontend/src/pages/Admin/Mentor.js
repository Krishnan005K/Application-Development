import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/styles/Admin/Mentor.css';

function Mentor() {
  const [mentors, setMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDept, setSearchDept] = useState('');
  const [searchBatch, setSearchBatch] = useState('');
  const [editFormData, setEditFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole === 'ROLE_ADMIN' || userRole === 'ROLE_HEAD') {
      fetchMentors();
    } else {
      toast.error('You do not have permission to view this page.');
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
      toast.error('Error fetching mentors.');
    }
  };

  const handleInputChange = (e, field, mentorId) => {
    setEditFormData(prevData => ({
      ...prevData,
      [mentorId]: {
        ...prevData[mentorId],
        [field]: e.target.value
      }
    }));
  };

  const handleSaveClick = async (mentorId) => {
    const updatedData = editFormData[mentorId];
    try {
      await axios.put(`http://127.0.0.1:8080/api/admin/mentors/${mentorId}`, updatedData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMentors(prevMentors =>
        prevMentors.map(mentor =>
          mentor.id === mentorId ? { ...mentor, ...updatedData } : mentor
        )
      );
      setEditFormData(prevData => {
        const newData = { ...prevData };
        delete newData[mentorId];
        return newData;
      });
      toast.success('Mentor updated successfully.');
    } catch (error) {
      console.error('Error updating mentor:', error);
      toast.error('Error updating mentor.');
    }
  };

  const handleCancelClick = (mentorId) => {
    setEditFormData(prevData => {
      const newData = { ...prevData };
      delete newData[mentorId];
      return newData;
    });
  };

  const handleDelete = async (mentor) => {
    if (window.confirm("Are you sure you want to delete this mentor?")) {
      try {
        await axios.delete(`http://127.0.0.1:8080/api/admin/mentors/${mentor.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setMentors(mentors.filter(m => m.id !== mentor.id));
        toast.success('Mentor deleted successfully.');
      } catch (error) {
        console.error('Error deleting mentor:', error);
        toast.error('Error deleting mentor.');
      }
    }
  };

  const startEditing = (mentor) => {
    setEditFormData({ [mentor.id]: mentor });
    setOriginalData(mentor);
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
      <ToastContainer />
      <h2>Mentor Management</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={searchDept} onChange={(e) => setSearchDept(e.target.value)}>
          <option value="">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="IT">IT</option>
        </select>
        <select value={searchBatch} onChange={(e) => setSearchBatch(e.target.value)}>
          <option value="">All Classes</option>
          
        </select>
      </div>

      <table className="mentor-table">
        <thead>
          <tr>
            
            <th>Name</th>
            <th>Email</th>
            
            <th>Department</th>
            <th>Class Being Mentored</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMentors.map(mentor => (
            <tr key={mentor.id}>
              
              <td className="editable-cell">
                {editFormData && editFormData[mentor.id] ?
                  <input
                    type="text"
                    value={editFormData[mentor.id].name}
                    onChange={(e) => handleInputChange(e, 'name', mentor.id)}
                  /> :
                  mentor.name
                }
              </td>
              <td className="editable-cell">
                {editFormData && editFormData[mentor.id] ?
                  <input
                    type="email"
                    value={editFormData[mentor.id].email}
                    onChange={(e) => handleInputChange(e, 'email', mentor.id)}
                  /> :
                  mentor.email
                }
              </td>
              
              <td className="editable-cell">
                {editFormData && editFormData[mentor.id] ?
                  <input
                    type="text"
                    value={editFormData[mentor.id].dept}
                    onChange={(e) => handleInputChange(e, 'dept', mentor.id)}
                  /> :
                  mentor.dept
                }
              </td>
              <td className="editable-cell">
                {editFormData && editFormData[mentor.id] ?
                  <input
                    type="text"
                    value={editFormData[mentor.id].classBeingMentored}
                    onChange={(e) => handleInputChange(e, 'classBeingMentored', mentor.id)}
                  /> :
                  mentor.classBeingMentored
                }
              </td>
              <td className="action-buttons">
                {editFormData && editFormData[mentor.id] ?
                  <>
                    <button onClick={() => handleSaveClick(mentor.id)}>
                      <FontAwesomeIcon icon={faSave} /> Save
                    </button>
                    <button className="cancel-button" onClick={() => handleCancelClick(mentor.id)}>
                      <FontAwesomeIcon icon={faTimes} /> Cancel
                    </button>
                  </> :
                  <>
                    <button onClick={() => startEditing(mentor)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDelete(mentor)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Mentor;
