import React from 'react';
import MeasurementInput from '../components/MeasurementInput';
import { Link } from 'react-router-dom';
import '../styles/components.css';

const Measurements = ({ userData, updateUserData }) => {
  return (
    <div className="measurements-page">
      <h1>Body Measurements</h1>
      <p>Enter your measurements to help us determine your body type and recommend flattering outfits.</p>
      
      <MeasurementInput userData={userData} updateUserData={updateUserData} />
      
      <div className="navigation-buttons">
        <Link to="/" className="nav-button">Back</Link>
        {userData.measurements.bust && (
          <Link to="/photo-upload" className="nav-button primary">Continue to Photo Upload</Link>
        )}
      </div>
    </div>
  );
};

export default Measurements;