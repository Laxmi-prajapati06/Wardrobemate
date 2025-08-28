import React, { useState, useEffect } from 'react';
import PromptGenerator from '../components/PromptGenerator';
import OutfitDisplay from '../components/OutfitDisplay';
import RecommendationEngine from '../components/RecommendationEngine';
import { Link } from 'react-router-dom';
import '../styles/components.css';

const PersonalizedSuggestions = ({ userData, updateUserData }) => {
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all recommendations at once
  const getAllRecommendations = () => {
    return {
      bodyType: RecommendationEngine.getBodyTypeRecommendations(userData),
      color: RecommendationEngine.getColorRecommendations(userData),
      occasion: RecommendationEngine.getOccasionRecommendations(userData)
    };
  };

  const { bodyType: bodyTypeOutfits, color: colorOutfits, occasion: occasionOutfits } = getAllRecommendations();

  // Handle AI-generated recommendations
  const handleAiGeneratedOutfit = (outfit) => {
    if (outfit && !outfit.startsWith('Error:')) {
      const newRecommendation = {
        id: Date.now(),
        name: 'AI-Generated Outfit',
        description: outfit,
        type: 'ai-generated',
        image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop' // Generic outfit image
      };
      setAiRecommendations(prev => [newRecommendation, ...prev].slice(0, 5));
      updateUserData('aiRecommendations', [...aiRecommendations, newRecommendation]);
    }
  };

  // Load any saved AI recommendations
  useEffect(() => {
    if (userData?.aiRecommendations) {
      setAiRecommendations(userData.aiRecommendations.slice(0, 5));
    }
  }, [userData]);

  return (
    <div className="personalized-suggestions">
      <h1>Your Personalized Recommendations</h1>
      
      <div className="ai-recommendation-section">
        <h2>AI-Powered Outfit Generator</h2>
        <PromptGenerator 
          userData={userData}
          onOutfitGenerated={handleAiGeneratedOutfit}
          setLoading={setLoading}
          setError={setError}
        />
        
        {loading && <div className="loading-spinner">Generating recommendations...</div>}
        {error && <div className="error-message">{error}</div>}
        
        {aiRecommendations.length > 0 && (
          <div className="ai-results">
            <h3>Recently Generated Outfits</h3>
            <OutfitDisplay outfits={aiRecommendations} />
          </div>
        )}
      </div>

      <div className="recommendation-sections">
        {userData.bodyType && bodyTypeOutfits.length > 0 && (
          <section className="recommendation-section">
            <div className="section-header">
              <h2>Outfits for Your Body Type: {userData.bodyType}</h2>
              <Link to="/body-type-suggestions" className="see-more">See More</Link>
            </div>
            <OutfitDisplay outfits={bodyTypeOutfits.slice(0, 3)} />
          </section>
        )}
        
        {userData.skinTone && colorOutfits.length > 0 && (
          <section className="recommendation-section">
            <div className="section-header">
              <h2>Colors for Your Skin Tone: {userData.skinTone}</h2>
              <Link to="/color-suggestions" className="see-more">See More</Link>
            </div>
            <OutfitDisplay outfits={colorOutfits.slice(0, 3)} />
          </section>
        )}
        
        {userData.occasion && occasionOutfits.length > 0 && (
          <section className="recommendation-section">
            <div className="section-header">
              <h2>Outfits for Your Occasion: {userData.occasion}</h2>
              <Link to="/occasion-suggestions" className="see-more">See More</Link>
            </div>
            <OutfitDisplay outfits={occasionOutfits.slice(0, 3)} />
          </section>
        )}
      </div>
    </div>
  );
};

export default PersonalizedSuggestions;