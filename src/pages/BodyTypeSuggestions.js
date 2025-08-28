import React from 'react';
import OutfitDisplay from '../components/OutfitDisplay';
import RecommendationEngine from '../components/RecommendationEngine';
import { Link } from 'react-router-dom';
import '../styles/components.css';

const BodyTypeSuggestions = ({ userData }) => {
  const outfits = RecommendationEngine.getBodyTypeRecommendations(userData.bodyType);

  return (
    <div className="body-type-suggestions">
      <h1>Outfits for Your Body Type</h1>
      <p className="subtitle">These styles are recommended for your {userData.bodyType} shape</p>
      
      {outfits.length > 0 ? (
        <OutfitDisplay outfits={outfits} />
      ) : (
        <p>No body type information available.</p>
      )}
      
      <div className="navigation-buttons">
        <Link to="/personalized-suggestions" className="nav-button">Back to All Recommendations</Link>
      </div>
    </div>
  );
};

export default BodyTypeSuggestions;