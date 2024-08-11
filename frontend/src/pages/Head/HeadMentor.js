import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Head/HeadMentor.css';

function HeadMentor() {
  const [mentors, setMentors] = useState([
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', password: '*****', contact: '123-456-7890', dept: 'CSE', classBeingMentored: 'A' },
    { id: '2', name: 'Bob Brown', email: 'bob@example.com', password: '*****', contact: '987-654-3210', dept: 'IT', classBeingMentored: 'B' },
    // More mentor data here...
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchDept, setSearchDept] = useState('');
  const [searchBatch, setSearchBatch] = useState('');
  const [formData, setFormData] = useState({ id: '', name: '', email: '', password: '', contact: '', dept: '', classBeingMentored: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({ id: '', name: '', email: '', password: '', contact: '', dept: '', classBeingMentored: '' });

  // Filter mentors based on search terms and dropdown selections
  const filteredMentors = mentors.filter(mentor =>
    (mentor.id.includes(searchTerm) || 
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    mentor.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (searchDept ? mentor.dept === searchDept : true) &&
    (searchBatch ? mentor.classBeingMentored === searchBatch : true)
  );

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleAddOrEdit = () => {
    const { id, name, email, password, contact, dept, classBeingMentored } = formData;
    if (id && name && email && password && contact && dept && classBeingMentored) {
      if (editingIndex !== null) {
        const updatedMentors = [...mentors];
        updatedMentors[editingIndex] = formData;
        setMentors(updatedMentors);
        setEditingIndex(null);
      } else {
        setMentors([...mentors, formData]);
      }
      setFormData({ id: '', name: '', email: '', password: '', contact: '', dept: '', classBeingMentored: '' });
    } else {
      alert('All fields must be filled out.');
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditFormData(mentors[index]);
  };

  const handleSaveClick = (index) => {
    const updatedMentors = [...mentors];
    updatedMentors[index] = editFormData;
    setMentors(updatedMentors);
    setEditingIndex(null);
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this mentor?")) {
      const updatedMentors = mentors.filter((_, i) => i !== index);
      setMentors(updatedMentors);
    }
  };

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
            <FontAwesomeIcon icon={faPlus} /> {editingIndex !== null ? 'Update Mentor' : 'Add Mentor'}
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
          {filteredMentors.map((mentor, index) => (
            <tr key={index}>
              {editingIndex === index ? (
                <>
                  <td><input type="text" name="id" value={editFormData.id} onChange={handleEditInputChange} disabled /></td>
                  <td><input type="text" name="name" value={editFormData.name} onChange={handleEditInputChange} /></td>
                  <td><input type="email" name="email" value={editFormData.email} onChange={handleEditInputChange} /></td>
                  <td><input type="password" name="password" value={editFormData.password} onChange={handleEditInputChange} /></td>
                  <td><input type="text" name="contact" value={editFormData.contact} onChange={handleEditInputChange} /></td>
                  <td><input type="text" name="dept" value={editFormData.dept} onChange={handleEditInputChange} /></td>
                  <td><input type="text" name="classBeingMentored" value={editFormData.classBeingMentored} onChange={handleEditInputChange} /></td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} onClick={() => handleSaveClick(index)} className="action-icon" />
                    <FontAwesomeIcon icon={faTimes} onClick={handleCancelClick} className="action-icon" />
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
                    <FontAwesomeIcon icon={faEdit} onClick={() => handleEditClick(index)} className="action-icon" />
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(index)} className="action-icon" />
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

export default HeadMentor;
