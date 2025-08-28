import React from 'react';
import OccasionSelector from '../components/OccasionSelector';
import { Link } from 'react-router-dom';
import '../styles/components.css';

const OccasionPage = ({ userData, updateUserData }) => {
  return (
    <div className="occasion-page">
      <h1>Select Your Occasion</h1>
      <p>Choose the event you're dressing for to get appropriate outfit recommendations.</p>
      
      <OccasionSelector userData={userData} updateUserData={updateUserData} />
      
      <div className="navigation-buttons">
        <Link to="/photo-upload" className="nav-button">Back</Link>
        {userData.occasion && (
          <Link to="/personalized-suggestions" className="nav-button primary">Get Recommendations</Link>
        )}
      </div>
    </div>
  );
};

export default OccasionPage;