// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MyApp</Link>
      </div>
      <div className="navbar-login">
        {isLoggedIn ? (
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
        ) : (
          <Link to="/login" onClick={handleLogin}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
