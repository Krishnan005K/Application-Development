// src/components/Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '' });
  const [errors, setErrors] = useState({ password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    let error = '';
    if (password.length < 6) {
      error = 'Password must be at least 6 characters long';
    } else if (!/\d/.test(password)) {
      error = 'Password must contain at least one number';
    } else if (!/[A-Z]/.test(password)) {
      error = 'Password must contain at least one UpperCase letter';
    } else if (!/[a-z]/.test(password)) {
      error = 'Password must contain at least one LowerCase letter';
    }
    setErrors({ password: error });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!errors.password) {
      // Add signup logic here
      console.log('Name:', formData.name);
      console.log('Email:', formData.email);
      console.log('Mobile:', formData.mobile);
      console.log('Password:', formData.password);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Signup</h2>
      <form onSubmit={handleSignup} className="signup-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <button type="submit" disabled={!!errors.password} className="submit-button">Signup</button>
      </form>
      <p className="form-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
