import React from 'react';

const OutfitList = ({ outfits, onSave }) => {
  if (outfits.length === 0) {
    return (
      <div className="card text-center p-6">
        <p>No recommendations found for your criteria.</p>
        <p>Try selecting a different occasion.</p>
      </div>
    );
  }

  return (
    <div className="outfit-grid">
      {outfits.map((outfit) => (
        <div key={outfit.id} className="outfit-card card">
          <div className="outfit-image">
            {outfit.image_url ? (
              <img 
                src={outfit.image_url} 
                alt={outfit.name}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop';
                  e.target.alt = 'Fallback outfit image';
                }}
              />
            ) : (
              <img 
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop" 
                alt="Default outfit"
              />
            )}
            {outfit.occasion && (
              <span className="outfit-tag">{outfit.occasion}</span>
            )}
          </div>
          <div className="outfit-details">
            <h3 className="outfit-title">{outfit.name}</h3>
            <p className="outfit-description">{outfit.description}</p>
            
            <div className="styling-tips">
              <h4>Styling Tips:</h4>
              <ul>
                {outfit.stylingTips && outfit.stylingTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <button
              onClick={() => onSave(outfit.id)}
              disabled={outfit.isSaved}
              className={`btn ${outfit.isSaved ? 'btn-secondary' : 'btn-primary'}`}
            >
              {outfit.isSaved ? 'Saved' : 'Save Recommendation'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OutfitList;