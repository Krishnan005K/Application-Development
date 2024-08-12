import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/styles/Interviewer/InterviewerSchedules.css'; // Make sure to import the CSS file

const InterviewForm = () => {
  const [interview, setInterview] = useState({
    title: '',
    description: '',
    roundName: '',
    scheduleDate: '',
    assignedBatch: '', // New field for batch assignment
  });

  const [questions, setQuestions] = useState([
    { questionText: '', type: '', options: '', correctOption: '', keywords: '' }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInterview((prevInterview) => ({
      ...prevInterview,
      [name]: value,
    }));
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [name]: value };
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', type: 'MCQ', options: '', correctOption: '', keywords: '' }]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const Token = localStorage.getItem('token'); // Replace with actual Bearer token

  const newData = {
    id: 0,
    title: interview.title,
    description: interview.description,
    roundName: interview.roundName,
    scheduleDate: interview.scheduleDate,
    assignedBatch: interview.assignedBatch, // Include the assigned batch in the data
    questions: questions.map((q) => {
      if (q.type === 'MCQ') {
        return {
          id: 0,
          questionText: q.questionText,
          "@type": "mcqQuestion",
          options: q.options,
          correctOption: q.correctOption,
        };
      } else {
        return {
          id: 0,
          questionText: q.questionText,
          "@type": "contentQuestion",
          keywords: q.keywords,
        };
      }
    })
  };

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

  return (
    <form className="interview-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Title:</label>
        <input className="form-input" type="text" name="title" value={interview.title} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label className="form-label">Description:</label>
        <textarea className="form-textarea" name="description" value={interview.description} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label className="form-label">Round Name:</label>
        <input className="form-input" type="text" name="roundName" value={interview.roundName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label className="form-label">Schedule Date:</label>
        <input className="form-input" type="date" name="scheduleDate" value={interview.scheduleDate} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label className="form-label">Assign to Batch:</label>
        <input className="form-input" type="text" name="assignedBatch" value={interview.assignedBatch} onChange={handleChange} required />
      </div>

      <div className="questions-section">
        <h4 className="questions-heading">Questions</h4>
        {questions.map((question, index) => (
          <div key={index} className="question-item">
            <input
              className="form-input"
              type="text"
              name="questionText"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(index, e)}
              placeholder="Question Text"
            />
            <select
              className="form-input"
              name="type"
              value={question.type}
              onChange={(e) => handleQuestionChange(index, e)}
            >
              <option value="">Select Type</option>
              <option value="MCQ">MCQ</option>
              <option value="Content">Content</option>
            </select>
            {question.type === 'MCQ' && (
              <>
                <input
                  className="form-input"
                  type="text"
                  name="options"
                  value={question.options}
                  onChange={(e) => handleQuestionChange(index, e)}
                  placeholder="Options (comma-separated)"
                />
                <input
                  className="form-input"
                  type="text"
                  name="correctOption"
                  value={question.correctOption}
                  onChange={(e) => handleQuestionChange(index, e)}
                  placeholder="Correct Option"
                />
              </>
            )}
            {question.type === 'Content' && (
              <input
                className="form-input"
                type="text"
                name="keywords"
                value={question.keywords}
                onChange={(e) => handleQuestionChange(index, e)}
                placeholder="Keywords (comma-separated)"
              />
            )}
            <button className="btn-remove" type="button" onClick={() => removeQuestion(index)}>
              Remove Question
            </button>
          </div>
        ))}
        <button className="btn-add" type="button" onClick={addQuestion}>
          Add Question
        </button>
      </div>

      <button className="btn-submit" type="submit">Save Interview</button>
    </form>
  );
};

export default InterviewForm;
