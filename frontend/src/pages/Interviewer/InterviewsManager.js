import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/styles/Interviewer/InterviewerSchedules.css'; // Make sure to import the CSS file

const InterviewsManager = () => {
  const [interviews, setInterviews] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    roundName: '',
    scheduleDate: '',
    assignedBatch: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [errors, setErrors] = useState({});

  const token = localStorage.getItem('token');
  const apiUrl = 'http://127.0.0.1:8080/api/interviews';

  useEffect(() => {
    axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      setInterviews(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [apiUrl, token]);

  const handleInputChange = (e, index = null) => {
    if (index !== null) {
      const updatedInterviews = [...interviews];
      updatedInterviews[index] = { ...updatedInterviews[index], [e.target.name]: e.target.value };
      setInterviews(updatedInterviews);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validateFields = (data) => {
    let isValid = true;
    let errors = {};
    if (!data.title) errors.title = 'Title is required';
    if (!data.description) errors.description = 'Description is required';
    if (!data.roundName) errors.roundName = 'Round Name is required';
    if (!data.scheduleDate) errors.scheduleDate = 'Schedule Date is required';
    if (!data.assignedBatch) errors.assignedBatch = 'Assigned Batch is required';

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
        const interviewToUpdate = interviews[editingIndex];
        await axios.put(`${apiUrl}/scheduled-date/${interviewToUpdate.scheduleDate}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
          const updatedInterviews = [...interviews];
          updatedInterviews[editingIndex] = response.data;
          setInterviews(updatedInterviews);
          setEditingIndex(null);
          setFormData({ title: '', description: '', roundName: '', scheduleDate: '', assignedBatch: '' });
          toast.success('Interview updated successfully!');
        }).catch((error) => {
          console.log(error);
          toast.error('Failed to update interview.');
        });
      } else {
        await axios.post(apiUrl, formData, {
          headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
          setInterviews([...interviews, response.data]);
          setFormData({ title: '', description: '', roundName: '', scheduleDate: '', assignedBatch: '' });
          toast.success('Interview added successfully!');
        }).catch((error) => {
          console.log(error);
          toast.error('Failed to add interview.');
        });
      }
    }
  };

  const handleEditClick = (index) => {
    setTempData({ ...interviews[index] });
    setEditingIndex(index);
    setFormData(interviews[index]);
  };

  const handleSaveClick = () => {
    setEditingIndex(null);
    setTempData(null);
  };

  const handleCancelClick = () => {
    const updatedInterviews = [...interviews];
    updatedInterviews[editingIndex] = tempData;
    setInterviews(updatedInterviews);
    setEditingIndex(null);
    setTempData(null);
  };

  const handleDelete = async (index) => {
    if (window.confirm("Are you sure you want to delete this interview?")) {
      const interviewToDelete = interviews[index];
      await axios.delete(`${apiUrl}/${interviewToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
        const updatedInterviews = interviews.filter((_, i) => i !== index);
        setInterviews(updatedInterviews);
        toast.success('Interview deleted successfully!');
      }).catch((error) => {
        console.log(error);
        toast.error('Failed to delete interview.');
      });
    }
  };

  return (
    <div className="interviews-manager">
      <h2>Interview Management</h2>
      <div className="filters">
        {/* Add filters if needed */}
      </div>

      <div className="interview-form-container">
        <div className="interview-form">
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} />
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} />
          <input type="text" name="roundName" placeholder="Round Name" value={formData.roundName} onChange={handleInputChange} />
          <input type="date" name="scheduleDate" placeholder="Schedule Date" value={formData.scheduleDate} onChange={handleInputChange} />
          <input type="text" name="assignedBatch" placeholder="Assigned Batch" value={formData.assignedBatch} onChange={handleInputChange} />

          <button className="add-interview-button" onClick={handleAddOrEdit}>
            <FontAwesomeIcon icon={faPlus} /> {editingIndex !== null ? 'Update Interview' : 'Add Interview'}
          </button>
        </div>
      </div>

      <table className="interview-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Round Name</th>
            <th>Schedule Date</th>
            <th>Assigned Batch</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview, index) => (
            <tr key={index}>
              {editingIndex === index ? (
                <>
                  <td><input type="text" name="title" value={interview.title} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="text" name="description" value={interview.description} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="text" name="roundName" value={interview.roundName} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="date" name="scheduleDate" value={interview.scheduleDate} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="text" name="assignedBatch" value={interview.assignedBatch} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} onClick={handleSaveClick} className="action-icon" />
                    <FontAwesomeIcon icon={faTimes} onClick={handleCancelClick} className="action-icon" />
                  </td>
                </>
              ) : (
                <>
                  <td>{interview.title}</td>
                  <td>{interview.description}</td>
                  <td>{interview.roundName}</td>
                  <td>{interview.scheduleDate}</td>
                  <td>{interview.assignedBatch}</td>
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

      {/* ToastContainer to display notifications */}
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </div>
  );
};

export default InterviewsManager;
