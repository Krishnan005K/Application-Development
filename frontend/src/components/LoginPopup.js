// src/components/LoginPopup.js
import React, { useState } from 'react';
import '../assets/styles/LoginPopup.css';
import { assets } from '../assets/images/assets'

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState('Login');
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.password) {
      // Add login/signup logic here
      console.log('Form Data:', formData);
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={handleSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-inputs">
          {currState === 'Sign Up' && (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="login-popup-input"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="login-popup-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="login-popup-input"
          />
          {errors.password && <p className="login-popup-error">{errors.password}</p>}
        </div>
        <button type="submit" className="login-popup-button">
          {currState === 'Sign Up' ? 'Create account now' : 'Login'}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use and privacy policy.</p>
        </div>
        {currState === 'Login' ? (
          <p>
            Create a new Account?{' '}
            <span onClick={() => setCurrState('Sign Up')} className="login-popup-toggle">
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span onClick={() => setCurrState('Login')} className="login-popup-toggle">
              Login Here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
