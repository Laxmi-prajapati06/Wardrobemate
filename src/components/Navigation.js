import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components.css';

const Navigation = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <div className="firstnav">
        <div className="logo">WardrobeMate</div>
        <img src="logo1.jpg" alt="" id="logo"></img>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/measurements">Measurements</Link></li>
        <li><Link to="/photo-upload">Photo Upload</Link></li>
        <li><Link to="/occasion">Occasion</Link></li>
        <li><Link to="/personalized-suggestions">Get Recommendations</Link></li>
      </ul>
      <button onClick={onLogout} className="logout-button">
        Logout
      </button>
    </nav>
  );
};

export default Navigation;