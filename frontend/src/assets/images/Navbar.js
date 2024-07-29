// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../Assets/styles/Navbar.css'; // Import the CSS file

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className="navbar-logo">Logo</div>
      <div className={`navbar-links-container ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/home" className="navbar-link">Home</Link>
        <Link to="/login" className="navbar-link">Login</Link>
        <Link to="/notifications" className="navbar-link">Notifications</Link>
        <button className="primary-button">Sign Up</button>
      </div>
      <div className="navbar-menu-container" onClick={toggleMenu}>
        {/* Use an icon library or SVG for the menu icon */}
        <svg /* icon properties */>
          <path /* path data */ />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
