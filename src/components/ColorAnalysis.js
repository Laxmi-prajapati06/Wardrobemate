import React from 'react';
import '../styles/components.css';

const ColorAnalysis = ({ skinTone }) => {
  // Color recommendations based on skin tone
  const colorRecommendations = {
    'Cool': {
      description: 'Cool undertones look best in jewel tones and cool colors',
      colors: [
        { name: 'Sapphire Blue', hex: '#0F52BA' },
        { name: 'Emerald Green', hex: '#50C878' },
        { name: 'Amethyst Purple', hex: '#9966CC' },
        { name: 'Ruby Red', hex: '#E0115F' },
        { name: 'Silver Gray', hex: '#C0C0C0' }
      ]
    },
    'Warm': {
      description: 'Warm undertones are complemented by earthy and warm colors',
      colors: [
        { name: 'Terracotta', hex: '#E2725B' },
        { name: 'Mustard Yellow', hex: '#FFDB58' },
        { name: 'Olive Green', hex: '#808000' },
        { name: 'Coral', hex: '#FF7F50' },
        { name: 'Gold', hex: '#FFD700' }
      ]
    },
    'Neutral': {
      description: 'Neutral undertones can wear both warm and cool colors well',
      colors: [
        { name: 'Dusty Rose', hex: '#DCAE96' },
        { name: 'Mauve', hex: '#E0B0FF' },
        { name: 'Teal', hex: '#008080' },
        { name: 'Soft Peach', hex: '#FFE5B4' },
        { name: 'Taupe', hex: '#483C32' }
      ]
    }
  };

  const getUndertone = () => {
    if (skinTone.includes('Cool')) return 'Cool';
    if (skinTone.includes('Warm')) return 'Warm';
    return 'Neutral';
  };

  const undertone = getUndertone();
  const recommendations = colorRecommendations[undertone] || colorRecommendations.Neutral;

  return (
    <div className="color-analysis">
      <h2>Color Recommendations for {undertone} Undertones</h2>
      <p className="description">{recommendations.description}</p>
      
      <div className="color-palette">
        {recommendations.colors.map((color, index) => (
          <div key={index} className="color-swatch">
            <div 
              className="color-box" 
              style={{ backgroundColor: color.hex }}
              title={color.name}
            ></div>
            <span className="color-name">{color.name}</span>
          </div>
        ))}
      </div>
      
      <div className="color-tips">
        <h3>Styling Tips</h3>
        <ul>
          {undertone === 'Cool' && (
            <>
              <li>Pair jewel tones with neutrals for balance</li>
              <li>Try monochromatic looks in cool shades</li>
              <li>Silver accessories will complement your undertones</li>
            </>
          )}
          {undertone === 'Warm' && (
            <>
              <li>Combine warm colors with earthy neutrals</li>
              <li>Try golden accessories to enhance your glow</li>
              <li>Autumn color palettes work well for you</li>
            </>
          )}
          {undertone === 'Neutral' && (
            <>
              <li>You can experiment with both warm and cool colors</li>
              <li>Try mixing different color temperatures</li>
              <li>Both silver and gold jewelry will suit you</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ColorAnalysis;