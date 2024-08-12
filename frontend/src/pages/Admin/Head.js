import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/styles/Admin/Head.css';

function Head() {
  const [heads, setHeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [formData, setFormData] = useState({ id: '', name: '', email: '', password: '', contact: '', dept: '', roles: 'ROLE_HEAD' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [errors, setErrors] = useState({});

  const token = localStorage.getItem('token');
  const apiUrl = 'http://127.0.0.1:8080/api/admin/heads';

  useEffect(() => {
    axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      setHeads(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [apiUrl, token]);

  const filteredHeads = heads.filter(head =>
    (head.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     head.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     String(head.id).includes(searchTerm)) &&
    (deptFilter === '' || head.dept === deptFilter)
  );

  const handleInputChange = (e, index = null) => {
    if (index !== null) {
      const updatedHeads = [...heads];
      updatedHeads[index] = { ...updatedHeads[index], [e.target.name]: e.target.value };
      setHeads(updatedHeads);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validateFields = (data) => {
    let isValid = true;
    let errors = {};
    if (!data.name) errors.name = 'Name is required';
    if (!data.email) errors.email = 'Email is required';
    if (!data.password) errors.password = 'Password is required';
    if (!data.contact) errors.contact = 'Contact is required';
    if (!data.dept) errors.dept = 'Department is required';

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      isValid = false;
    } else {
      setErrors({});
    }
    return isValid;
  };

  const handleAddOrEdit = async () => {
    if (validateFields(formData)) {
      if (editingIndex !== null) {
        const updatedHead = heads[editingIndex];
        await axios.put(`${apiUrl}/${updatedHead.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
          const updatedHeads = [...heads];
          updatedHeads[editingIndex] = response.data;
          setHeads(updatedHeads);
          setEditingIndex(null);
          setFormData({ id: '', name: '', email: '', password: '', contact: '', dept: '', roles: 'ROLE_HEAD' });
          toast.success('Head updated successfully!');
        }).catch((error) => {
          console.log(error);
          toast.error('Failed to update head.');
        });
      } else {
        await axios.post(apiUrl, formData, {
          headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
          setHeads([...heads, response.data]);
          setFormData({ id: '', name: '', email: '', password: '', contact: '', dept: '', roles: 'ROLE_HEAD' });
          toast.success('Head added successfully!');
        }).catch((error) => {
          console.log(error);
          toast.error('Failed to add head.');
        });
      }
    }
  };

  const handleEditClick = (index) => {
    setTempData({ ...heads[index] });
    setEditingIndex(index);
    setFormData(heads[index]);
  };

  const handleSaveClick = () => {
    setEditingIndex(null);
    setTempData(null);
  };

  const handleCancelClick = () => {
    const updatedHeads = [...heads];
    updatedHeads[editingIndex] = tempData;
    setHeads(updatedHeads);
    setEditingIndex(null);
    setTempData(null);
  };

  const handleDelete = async (index) => {
    if (window.confirm("Are you sure you want to delete this head?")) {
      const headToDelete = heads[index];
      await axios.delete(`${apiUrl}/${headToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
        const updatedHeads = heads.filter((_, i) => i !== index);
        setHeads(updatedHeads);
        toast.success('Head deleted successfully!');
      }).catch((error) => {
        console.log(error);
        toast.error('Failed to delete head.');
      });
    }
  };

  return (
    <div className="head-view">
      <h2>Head Management</h2>
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

      <div className="head-form-container">
        <div className="head-form">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
          <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleInputChange} />
          <input type="text" name="dept" placeholder="Department" value={formData.dept} onChange={handleInputChange} />
         
          <button className="add-head-button" onClick={handleAddOrEdit}>
            <FontAwesomeIcon icon={faPlus} /> {editingIndex !== null ? 'Update Head' : 'Add Head'}
          </button>
        </div>
      </div>

      <table className="head-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Contact</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredHeads.map((head, index) => (
            <tr key={index}>
              {editingIndex === index ? (
                <>
                  <td><input type="text" name="name" value={head.name} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="email" name="email" value={head.email} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="password" name="password" value={head.password} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="text" name="contact" value={head.contact} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="text" name="dept" value={head.dept} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} onClick={handleSaveClick} className="action-icon" />
                    <FontAwesomeIcon icon={faTimes} onClick={handleCancelClick} className="action-icon" />
                  </td>
                </>
              ) : (
                <>
                  <td>{head.name}</td>
                  <td>{head.email}</td>
                  <td>{head.password}</td>
                  <td>{head.contact}</td>
                  <td>{head.dept}</td>
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

      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default Head;
