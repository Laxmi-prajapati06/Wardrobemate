import React, { useState } from 'react';
import './styles/components.css';

const OccasionOutfitGenerator = ({ occasion }) => {
  const [outfitType, setOutfitType] = useState('all');
  
  const occasionOutfits = {
    'Casual Day Out': {
      all: [
        { id: 1, name: 'Denim & White Tee', items: ['Classic jeans', 'White t-shirt', 'Sneakers', 'Crossbody bag'] },
        { id: 2, name: 'Midi Dress', items: ['Floral midi dress', 'Denim jacket', 'Sandals', 'Straw bag'] },
        { id: 3, name: 'Jumpsuit', items: ['Linen jumpsuit', 'Slides', 'Minimalist jewelry', 'Sunglasses'] }
      ],
      top: [
        { id: 4, name: 'Graphic Tee', items: ['Statement graphic tee', 'High-waisted jeans', 'White sneakers'] },
        { id: 5, name: 'Blouse', items: ['Silk blouse', 'Straight-leg pants', 'Loafers'] }
      ],
      bottom: [
        { id: 6, name: 'Distressed Jeans', items: ['Distressed denim', 'Basic tee', 'Leather jacket'] },
        { id: 7, name: 'Linen Pants', items: ['Wide-leg linen pants', 'Tank top', 'Flat sandals'] }
      ]
    },
    'Business Formal': {
      all: [
        { id: 8, name: 'Tailored Suit', items: ['Matching blazer and pants', 'Button-down shirt', 'Pumps', 'Briefcase'] },
        { id: 9, name: 'Sheath Dress', items: ['Fitted sheath dress', 'Blazer', 'Pumps', 'Structured bag'] },
        { id: 10, name: 'Pencil Skirt Set', items: ['Pencil skirt', 'Matching blouse', 'Heels', 'Watch'] }
      ],
      top: [
        { id: 11, name: 'Button-Down', items: ['Crisp white button-down', 'Blazer', 'Pearl earrings'] },
        { id: 12, name: 'Silk Blouse', items: ['Silk blouse', 'Statement necklace', 'Watches'] }
      ],
      bottom: [
        { id: 13, name: 'Tailored Pants', items: ['Wool trousers', 'Belt', 'Loafers'] },
        { id: 14, name: 'Pencil Skirt', items: ['Fitted pencil skirt', 'Tights', 'Pumps'] }
      ]
    },
    'Cocktail Party': {
      all: [
        { id: 15, name: 'LBD', items: ['Little black dress', 'Statement heels', 'Clutch', 'Bold jewelry'] },
        { id: 16, name: 'Sequin Top', items: ['Sequin blouse', 'Black trousers', 'Stilettos', 'Metallic bag'] },
        { id: 17, name: 'Slip Dress', items: ['Satin slip dress', 'Strappy heels', 'Delicate jewelry', 'Wrap'] }
      ],
      top: [
        { id: 18, name: 'Silk Camisole', items: ['Silk camisole', 'Blazer', 'Skinny pants'] },
        { id: 19, name: 'Off-Shoulder', items: ['Off-shoulder top', 'Pencil skirt', 'Heels'] }
      ],
      bottom: [
        { id: 20, name: 'Leather Pants', items: ['Faux leather pants', 'Silk blouse', 'Heels'] },
        { id: 21, name: 'Tulle Skirt', items: ['Tulle midi skirt', 'Fitted top', 'Strappy sandals'] }
      ]
    }
  };

  const currentOccasion = occasionOutfits[occasion] || occasionOutfits['Casual Day Out'];
  const outfitsToShow = currentOccasion[outfitType] || currentOccasion.all;

  return (
    <div className="occasion-outfit-generator">
      <h2>{occasion} Outfits</h2>
      
      <div className="outfit-filters">
        <button 
          className={outfitType === 'all' ? 'active' : ''}
          onClick={() => setOutfitType('all')}
        >
          Complete Outfits
        </button>
        <button 
          className={outfitType === 'top' ? 'active' : ''}
          onClick={() => setOutfitType('top')}
        >
          Top Combinations
        </button>
        <button 
          className={outfitType === 'bottom' ? 'active' : ''}
          onClick={() => setOutfitType('bottom')}
        >
          Bottom Combinations
        </button>
      </div>
      
      <div className="outfit-grid">
        {outfitsToShow.map(outfit => (
          <div key={outfit.id} className="outfit-card">
            <h3>{outfit.name}</h3>
            <ul className="outfit-items">
              {outfit.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button className="save-outfit">Save This Outfit</button>
          </div>
        ))}
      </div>
      
      <div className="styling-tips">
        <h3>Styling Tips for {occasion}</h3>
        {occasion === 'Casual Day Out' && (
          <p>Keep it comfortable yet stylish. Layer pieces for versatility and choose breathable fabrics.</p>
        )}
        {occasion === 'Business Formal' && (
          <p>Opt for tailored fits and neutral colors. Ensure your outfit is polished and professional.</p>
        )}
        {occasion === 'Cocktail Party' && (
          <p>Have fun with textures and shine. Balance fitted pieces with flowy elements.</p>
        )}
      </div>
    </div>
  );
};

export default OccasionOutfitGenerator;