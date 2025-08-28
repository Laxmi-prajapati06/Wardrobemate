import React from 'react';
import '../styles/components.css';

const OutfitDisplay = ({ outfits }) => (
  <div className="outfit-grid">
    {outfits.map(outfit => (
      <div key={outfit.id} className="outfit-card">
        <img 
          className="image-placeholder"
          src={outfit.image} 
          alt={outfit.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/fallback-outfit.jpg'; // This now points to public folder
          }}
        />
        <h3>{outfit.name}</h3>
        <p>{outfit.description}</p>
      </div>
    ))}
  </div>
);

export default OutfitDisplay;