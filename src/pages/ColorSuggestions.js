import React from 'react';
import OutfitDisplay from '../components/OutfitDisplay';
import RecommendationEngine from '../components/RecommendationEngine';
import { Link } from 'react-router-dom';
import '../styles/components.css';

const ColorSuggestions = ({ userData }) => {
  const outfits = RecommendationEngine.getColorRecommendations(userData.skinTone);

  return (
    <div className="color-suggestions">
      <h1>Color Recommendations</h1>
      <p className="subtitle">These colors complement your {userData.skinTone} skin tone</p>
      
      {outfits.length > 0 ? (
        <OutfitDisplay outfits={outfits} />
      ) : (
        <p>No skin tone information available.</p>
      )}
      
      <div className="navigation-buttons">
        <Link to="/personalized-suggestions" className="nav-button">Back to All Recommendations</Link>
      </div>
    </div>
  );
};

export default ColorSuggestions;