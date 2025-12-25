import React from 'react';

const SkinToneResult = ({ skinTone, colors, onContinue }) => {
  // Add defensive programming to handle undefined values
  if (!skinTone) {
    return (
      <div className="skin-tone-result fade-in">
        <h2>Analysis Error</h2>
        <p>No skin tone data received. Please try again.</p>
        <button onClick={onContinue} className="btn btn-primary">
          Continue
        </button>
      </div>
    );
  }

  const toneDescriptions = {
    cool: {
      name: 'Cool',
      description: 'Your skin has pink, red, or blue undertones. Silver jewelry typically looks best on you.',
      colors: ['Navy', 'Emerald', 'Plum', 'Pink', 'Gray']
    },
    warm: {
      name: 'Warm',
      description: 'Your skin has yellow, peach, or golden undertones. Gold jewelry typically looks best on you.',
      colors: ['Olive', 'Mustard', 'Terracotta', 'Gold', 'Brown']
    },
    neutral: {
      name: 'Neutral',
      description: 'Your skin has a balance of warm and cool undertones. Both silver and gold jewelry look good on you.',
      colors: ['Black', 'White', 'Denim', 'Soft Pink', 'Taupe']
    }
  };

  // Handle case where skinTone might be a string or an object
  const skinToneValue = typeof skinTone === 'string' ? skinTone : skinTone.skin_tone || skinTone.tone;
  const description = toneDescriptions[skinToneValue] || toneDescriptions.neutral;

  return (
    <div className="skin-tone-result fade-in">
      <h2>Your Skin Tone: {description.name}</h2>
      <p className="mb-4">{description.description}</p>
      
      <div className="mb-6">
        <h3>Recommended Colors:</h3>
        <div className="color-swatches">
          {colors && colors.map((color, index) => (
            <div 
              key={index} 
              className="color-swatch"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
        <ul className="styling-tips">
          {description.colors.map((color, index) => (
            <li key={index}>{color}</li>
          ))}
        </ul>
      </div>
      
      <button
        onClick={onContinue}
        className="btn btn-primary btn-block"
      >
        Get Outfit Recommendations
      </button>
    </div>
  );
};

export default SkinToneResult;