import React from 'react';
import OutfitDisplay from '../components/OutfitDisplay';
import RecommendationEngine from '../components/RecommendationEngine';
import { Link } from 'react-router-dom';
import '../styles/components.css';

const OccasionSuggestions = ({ userData }) => {
  const outfits = RecommendationEngine.getOccasionRecommendations(userData.occasion);

  return (
    <div className="occasion-suggestions">
      <h1>Occasion Outfits</h1>
      <p className="subtitle">Perfect for your {userData.occasion} event</p>
      
      {outfits.length > 0 ? (
        <OutfitDisplay outfits={outfits} />
      ) : (
        <p>No occasion selected.</p>
      )}
      
      <div className="navigation-buttons">
        <Link to="/personalized-suggestions" className="nav-button">Back to All Recommendations</Link>
      </div>
    </div>
  );
};

export default OccasionSuggestions;