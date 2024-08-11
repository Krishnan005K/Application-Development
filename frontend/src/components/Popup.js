import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/styles/Popup.css'; // Import your custom styles for the popup

function Popup({ show, message, icon, onClose }) {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <FontAwesomeIcon icon={icon} className="popup-icon" />
        <p className="popup-message">{message}</p>
        <button className="popup-close-button" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}

export default Popup;
