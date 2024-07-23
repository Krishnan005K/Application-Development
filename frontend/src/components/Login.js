// src/components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (!errors.password) {
      // Add login logic here
      console.log('Email:', formData.email);
      console.log('Password:', formData.password);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
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
        <button type="submit" disabled={!!errors.password} className="submit-button">Login</button>
      </form>
      <p className="form-link">
        New user? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
