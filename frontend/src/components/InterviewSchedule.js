import React, { useState } from 'react';
import '../assets/styles/InterviewSchedule.css';

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

  const interviewerEmail = 'staticemail@example.com'; // Static interviewer email ID

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    // Logic to schedule interview
    setShowQuestionForm(true); // Show the question creation form
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    setQuestions([...questions, { roundName, question, questionType, options, correctAnswer }]);
    setQuestion('');
    setQuestionType('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    setShowCreateTestButton(true);
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
                      <input type="radio" name={option-`${index}`} disabled />
                    ) : (
                      <input type="checkbox" name={option-`${index}`} disabled />
                    )}
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={Option `${index + 1}`}
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
                <div className="options">
                  {q.options.map((option, idx) => (
                    <div key={idx} className="option-display">
                      {q.questionType === 'radio' ? (
                        <input type="radio" name={question-`${index}`} />
                      ) : (
                        <input type="checkbox" name={question-`${index}`} />
                      )}
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="correct-answers">
            <h2>Correct Answers</h2>
            {questions.map((q, index) => (
              <div key={index} className="correct-answer-card">
                <p><strong>{q.roundName}:</strong> {q.question}</p>
                <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default InterviewCreate;