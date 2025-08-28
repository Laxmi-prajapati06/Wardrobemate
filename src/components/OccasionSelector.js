import React, { useState } from 'react';
import '../styles/components.css';

const OccasionSelector = ({ userData, updateUserData }) => {
  const [selectedOccasion, setSelectedOccasion] = useState(userData.occasion || '');

  const occasions = [
    'Casual Day Out',
    'Business Formal',
    'Cocktail Party',
    'Date Night',
    'Wedding Guest',
    'Job Interview',
    'Vacation',
    'Formal Event',
    'Night Out',
    'Brunch'
  ];

  const handleOccasionChange = (occasion) => {
    setSelectedOccasion(occasion);
    updateUserData('occasion', occasion);
  };

  return (
    <div className="occasion-selector">
      <h2>Select an Occasion</h2>
      <p>Choose the event you're dressing for to get tailored recommendations.</p>
      
      <div className="occasion-grid">
        {occasions.map((occasion) => (
          <div 
            key={occasion}
            className={`occasion-card ${selectedOccasion === occasion ? 'selected' : ''}`}
            onClick={() => handleOccasionChange(occasion)}
          >
            {occasion}
          </div>
        ))}
      </div>
      
      {selectedOccasion && (
        <div className="selected-occasion">
          <p>You've selected: <strong>{selectedOccasion}</strong></p>
        </div>
      )}
    </div>
  );
};

export default OccasionSelector;