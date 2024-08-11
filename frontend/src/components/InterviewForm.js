import React, { useState } from 'react';
import axios from 'axios';

const InterviewForm = () => {
  const [interview, setInterview] = useState({
    title: '',
    description: '',
    roundName: '',
    scheduleDate: '',
    scheduleTime: { hour: 0, minute: 0, second: 0, nano: 0 },
    Questions: '',
  });
  const [questions, setQuestions] = useState([{ questionText: '', type: 'MCQ' }]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('scheduleTime.')) {
      const timeField = name.split('.')[1];
      setInterview((prevInterview) => ({
        ...prevInterview,
        scheduleTime: { ...prevInterview.scheduleTime, [timeField]: parseInt(value) },
      }));
    } else {
      setInterview((prevInterview) => ({
        ...prevInterview,
        [name]: value,
      }));
    }
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [name]: value };
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', type: 'MCQ' }]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const Token = localStorage.getItem('token') // Replace with actual Bearer token


  const newData = {
    id: 0,
    title: interview.title,
    description: interview.description,
    roundName: interview.roundName,
    scheduleDate: interview.scheduleDate,
    scheduleTime: interview.scheduleTime,
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8080/api/interviews', newData, {
        headers: {
          Authorization: `Bearer ${Token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Interview saved successfully:', response.data);
      // Clear form or provide feedback as necessary
    } catch (error) {
      console.error('Error saving interview:', error);
    }
  };

  const updateInterview = async (id) => {

    try {
      const response = await axios.put(`http://127.0.0.1:8080/api/interviews/${id}`, interview, {
        headers: {
          Authorization: `Bearer ${Token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Interview updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating interview:', error);
    }
  };

  const deleteInterview = async (id) => {

    try {
      await axios.delete(`http://127.0.0.1:8080/api/interviews/${id}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Interview deleted successfully');
    } catch (error) {
      console.error('Error deleting interview:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={interview.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={interview.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Round Name:</label>
        <input type="text" name="roundName" value={interview.roundName} onChange={handleChange} required />
      </div>
      <div>
        <label>Schedule Date:</label>
        <input type="date" name="scheduleDate" value={interview.scheduleDate} onChange={handleChange} required />
      </div>
      <div>
        <label>Schedule Time:</label>
        <input type="number" name="scheduleTime.hour" value={interview.scheduleTime.hour} onChange={handleChange} required placeholder="Hour" />
        <input type="number" name="scheduleTime.minute" value={interview.scheduleTime.minute} onChange={handleChange} required placeholder="Minute" />
        <input type="number" name="scheduleTime.second" value={interview.scheduleTime.second} onChange={handleChange} required placeholder="Second" />
        <input type="number" name="scheduleTime.nano" value={interview.scheduleTime.nano} onChange={handleChange} required placeholder="Nano" />
      </div>
      <div>
        <label>Questions (CSV of IDs):</label>
        <input type="text" name="Questions" value={interview.Questions} onChange={handleChange} />
      </div>

      <div>
        <h4>Questions</h4>
        {questions.map((question, index) => (
          <div key={index}>
            <input
              type="text"
              name="questionText"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(index, e)}
              placeholder="Question Text"
            />
            <select
              name="type"
              value={question.type}
              onChange={(e) => handleQuestionChange(index, e)}
            >
              <option value="MCQ">MCQ</option>
              <option value="Content">Content</option>
            </select>
            <button type="button" onClick={() => removeQuestion(index)}>
              Remove Question
            </button>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>
          Add Question
        </button>
      </div>

      <button type="submit">Save Interview</button>
    </form>
  );
};

export default InterviewForm;
