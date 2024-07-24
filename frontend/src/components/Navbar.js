// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Navbar.css';

const Navbar = ({ setShowLogin }) => {
  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <div className='hamburger-menu'>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Link to="/">
          <img src='/path/to/logo.png' alt="My Interview Practice" className='logo' />
        </Link>
      </div>

      <div className='navbar-right'>
        
        <button onClick={() => setShowLogin(true)} className='signup-button'>Sign Up</button>
      </div>
    </div>
  );
};

export default Navbar;
