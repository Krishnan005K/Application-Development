// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPopup from './components/LoginPopup';
import './assets/styles/Navbar.css'; // Importing Navbar CSS
import Intro from './components/Intro';
import Content from './components/Content';
import VideoIntro from './components/VideoIntro';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <Router>
      <div>
      <Navbar setShowLogin={setShowLogin} />
      <Intro/>
      <Content/>
      <VideoIntro/>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
        <Routes>
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> */}
          <Route path="/" />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
