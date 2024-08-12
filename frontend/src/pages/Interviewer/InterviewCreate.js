import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'D:/sem5-project1/Fullstack-project1/frontend/src/Assets/Styles/InterviewerCss/InterviewCreateCss.css';

function InterviewCreate() {
  const [intervieweeEmail, setIntervieweeEmail] = useState('');
  const [interviewDateTime, setInterviewDateTime] = useState('');
  const [roundNumber, setRoundNumber] = useState('');
  const [roundName, setRoundName] = useState('');
  const [duration, setDuration] = useState('');
  const [question, setQuestion] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questions, setQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showCreateTestButton, setShowCreateTestButton] = useState(false);
  const [showTestForm, setShowTestForm] = useState(false);
  const [interviewId, setInterviewId] = useState(null);
  const [interviewerEmail, setInterviewerEmail] = useState('');

  useEffect(() => {
    // Retrieve the interviewer email from local storage
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setInterviewerEmail(storedEmail);
    }
  }, []);

  const getAuthToken = () => localStorage.getItem('token');

  const getAxiosConfig = () => {
    const token = getAuthToken();
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/interviews', {
        title: 'Interview Title',
        description: 'Interview Description',
        roundName,
        scheduleDate: interviewDateTime.split('T')[0],
        scheduleTime: interviewDateTime.split('T')[1],
        student: { email: intervieweeEmail },
        interviewer: { email: interviewerEmail },
      }, getAxiosConfig());
      setInterviewId(response.data.id);
      setShowQuestionForm(true); // Show the question creation form
    } catch (error) {
      console.error('Error scheduling interview:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Status code:', error.response.status);
      }
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    try {
      const questionData = { roundName, question, questionType, options, correctAnswer };
      const response = await axios.post(`/api/interviews/${interviewId}/questions`, [questionData], getAxiosConfig());
      setQuestions([...questions, ...response.data]);
      setQuestion('');
      setQuestionType('');
      setOptions(['', '', '', '']);
      setCorrectAnswer('');
      setShowCreateTestButton(true);
    } catch (error) {
      console.error('Error adding questions:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Status code:', error.response.status);
      }
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreateTest = () => {
    setShowTestForm(true);
  };

  return (
    <div className="interview-create">
      <h2>Schedule Interview</h2>
      <form className="schedule-form" onSubmit={handleScheduleSubmit}>
        <input
          type="email"
          value={intervieweeEmail}
          onChange={(e) => setIntervieweeEmail(e.target.value)}
          placeholder="Interviewee Email ID"
          required
        />
        <input
          type="email"
          value={interviewerEmail}
          readOnly
          placeholder="Interviewer Email ID"
        />
        <input
          type="datetime-local"
          value={interviewDateTime}
          onChange={(e) => setInterviewDateTime(e.target.value)}
          placeholder="Interview Date & Time"
          required
        />
        <input
          type="number"
          value={roundNumber}
          onChange={(e) => setRoundNumber(e.target.value)}
          placeholder="Round Number"
          required
        />
        <select
          value={roundName}
          onChange={(e) => setRoundName(e.target.value)}
          required
        >
          <option value="">Select Round Name</option>
          <option value="Technical Round">Technical Round</option>
          <option value="Aptitude Round">Aptitude Round</option>
          <option value="Group Discussion">Group Discussion</option>
          <option value="Behavioral Round">Behavioral Round</option>
          <option value="Mock Presentation">Mock Presentation</option>
          <option value="HR Round">HR Round</option>
        </select>
        <input
          type="time"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration (HH:MM:SS)"
          step="1"
          required
        />
        <button type="submit">Schedule Interview</button>
      </form>

      {showQuestionForm && (
        <>
          <h2>Create Questions for Rounds</h2>
          <form className="question-form" onSubmit={handleQuestionSubmit}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter question"
              required
            />
            <div>
              <label>
                <input
                  type="radio"
                  name="questionType"
                  value="radio"
                  checked={questionType === 'radio'}
                  onChange={(e) => setQuestionType(e.target.value)}
                />
                Radio
              </label>
              <label>
                <input
                  type="radio"
                  name="questionType"
                  value="checkbox"
                  checked={questionType === 'checkbox'}
                  onChange={(e) => setQuestionType(e.target.value)}
                />
                Checkbox
              </label>
            </div>
            {questionType && (
              <div className="options">
                {options.map((option, index) => (
                  <div key={index} className="option-input">
                    {questionType === 'radio' ? (
                      <input type="radio" name={`option-${index}`} disabled />
                    ) : (
                      <input type="checkbox" name={`option-${index}`} disabled />
                    )}
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      required
                    />
                  </div>
                ))}
                <input
                  type="text"
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  placeholder="Enter correct answer"
                  required
                />
              </div>
            )}
            <button type="submit">Add Question</button>
          </form>
        </>
      )}

      {showCreateTestButton && (
        <button className="create-test-button" onClick={handleCreateTest}>Create Test</button>
      )}

      {showTestForm && (
        <>
          <div className="test-form">
            <h2>Test Form</h2>
            {questions.map((q, index) => (
              <div key={index} className="test-question">
                <p><strong>{q.roundName}:</strong> {q.question}</p>
                <div className="test-options">
                  {q.options.map((option, i) => (
                    <label key={i}>
                      <input
                        type={q.questionType}
                        value={option}
                        disabled
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default InterviewCreate;
