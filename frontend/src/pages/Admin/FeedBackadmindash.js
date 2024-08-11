import React, { useState } from 'react';
import '../../assets/styles/Admin/FeedBackadmindash.css';

// Example of SVG star icon
const StarIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill={filled ? "#FFD700" : "#E0E0E0"} // Gold for filled, Gray for unfilled
  >
    <path d="M12 2l3 6 6 1-4 4 1 6-5-3-5 3 1-6-4-4 6-1 3-6z" />
  </svg>
);

const feedbackData = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    type: 'student',
    rating: 4,
    comment: 'The course content was very helpful, and the mentors were great!',
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    type: 'interviewer',
    rating: 5,
    comment: 'The interview was conducted smoothly, and the platform is user-friendly.',
  },
  {
    username: 'mike_johnson',
    email: 'mike@example.com',
    type: 'student',
    rating: 3,
    comment: 'The resources are good, but some topics need more depth.',
  },
  {
    username: 'alice_brown',
    email: 'alice@example.com',
    type: 'interviewer',
    rating: 5,
    comment: 'Excellent interviewee, very well-prepared!',
  },
  // Add more feedback entries here
];

function FeedbackAdminDashboard() {
  const [filterType, setFilterType] = useState('');

  const getStarIcons = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon key={index} filled={index < rating} />
    ));
  };

  const filteredFeedback = feedbackData.filter((feedback) => {
    return filterType === '' || feedback.type === filterType;
  });

  return (
    <div className="feedback-admin-container">
      <h2>Feedback</h2>

      <div className="feedback-admin-filters">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Feedback</option>
          <option value="student">Student</option>
          <option value="interviewer">Interviewer</option>
        </select>
      </div>

      <div className="feedback-admin-cards">
        {filteredFeedback.map((feedback, index) => (
          <div key={index} className={`feedback-admin-card ${feedback.type}`}>
            <div className="feedback-admin-header">
              <h3>{feedback.username}</h3>
              <span className="feedback-admin-type">{feedback.type}</span>
            </div>
            <p className="feedback-admin-email">{feedback.email}</p>
            <p className="feedback-admin-comment">"{feedback.comment}"</p>
            <div className="feedback-admin-rating">
              Rating: {getStarIcons(feedback.rating)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedbackAdminDashboard;
