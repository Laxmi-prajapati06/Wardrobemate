import React, { useState, useEffect } from 'react';
import OutfitDisplay from '../components/OutfitDisplay';
import '../styles/occasion-suggestions.css';

const occasions = [
  { id: 'formal', name: 'Formal', icon: '👔' },
  { id: 'casual', name: 'Casual', icon: '👕' },
  { id: 'party', name: 'Party', icon: '🎉' },
  { id: 'work', name: 'Work', icon: '💼' },
  { id: 'date', name: 'Date Night', icon: '🍷' }
];

const outfitDatabase = {
  formal: [
    { 
      id: 1, 
      name: 'Tailored Suit', 
      image: 'https://cdn.prod.website-files.com/661e56bde12bf275217d8b65/66fd490fb08bd1a7f5d0747d_woman%20black%20suit.webp', 
      description: 'Classic navy suit with white shirt',
      tags: ['Professional', 'Business']
    },
    { 
      id: 2, 
      name: 'Sheath Dress', 
      image: 'https://m.media-amazon.com/images/I/710CMSVnbEL._AC_UY1100_.jpg', 
      description: 'Elegant black sheath dress',
      tags: ['Chic', 'Office']
    }
  ],
  casual: [
    { 
      id: 3, 
      name: 'Denim & Tee', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq3E4UN8Z2_GlijNqPa7a0vNVWPbr4vZErgt39Zo28TnVpiZLSoBJPbhLJ0Lpm6PVnTts&usqp=CAU', 
      description: 'Light jeans with white t-shirt',
      tags: ['Comfortable', 'Everyday']
    },
    { 
      id: 4, 
      name: 'Summer Dress', 
      image: 'https://i.pinimg.com/736x/39/54/55/3954558b8b5f519f0292be0feadf7773.jpg', 
      description: 'Floral print casual dress',
      tags: ['Light', 'Breathable']
    }
  ],
  party: [
    { 
      id: 5, 
      name: 'Sequin Dress', 
      image: 'https://www.na-kd.com/cdn-cgi/image/width=300,quality=80,sharpen=0.3/globalassets/nakd_home_party_sequin_pants_1736-000012-2059_60109.jpg?ref=96D5065A8C', 
      description: 'Sparkly cocktail dress',
      tags: ['Glamorous', 'Festive']
    },
    { 
      id: 6, 
      name: 'Jumpsuit', 
      image: 'https://cdn.aboutstatic.com/file/images/1f6e6a90d605282676da04492a0177f0.jpg?quality=75&height=480&width=360', 
      description: 'Stylish black jumpsuit',
      tags: ['Modern', 'Trendy']
    }
  ],
  work: [
    { 
      id: 7, 
      name: 'Blazer & Slacks', 
      image: 'https://d1fufvy4xao6k9.cloudfront.net/images/blog/posts/2023/08/hockerty_woman_wearing_interview_outfit_conservative_outfit_cor_022f1a33_279c_4a17_a030_1c8bec621b5f.jpg',  
      description: 'Professional work attire',
      tags: ['Office', 'Corporate']
    }
  ],
  date: [
    { 
      id: 8, 
      name: 'Little Black Dress', 
      image: 'https://i.pinimg.com/736x/48/ce/b7/48ceb7e61428764f602b4be52813298b.jpg', 
      description: 'Classic date night dress',
      tags: ['Elegant', 'Romantic']
    }
  ]
};

const OccasionOutfit = () => {
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [customOccasion, setCustomOccasion] = useState('');
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOccasionSelect = (occasionId) => {
    setSelectedOccasion(occasionId);
    setCustomOccasion('');
  };

  const handleCustomOccasionSubmit = (e) => {
    e.preventDefault();
    if (customOccasion.trim()) {
      setSelectedOccasion('custom');
      // For custom occasions, we'll show a mix of different outfit types
      setOutfits([
        ...outfitDatabase.formal.slice(0, 1),
        ...outfitDatabase.casual.slice(0, 1),
        ...outfitDatabase.party.slice(0, 1)
      ]);
    }
  };

  useEffect(() => {
    if (selectedOccasion && selectedOccasion !== 'custom') {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      setTimeout(() => {
        try {
          const occasionOutfits = outfitDatabase[selectedOccasion] || [];
          setOutfits(occasionOutfits);
        } catch (err) {
          setError('Failed to load outfits. Please try again.');
          console.error('Error:', err);
        } finally {
          setLoading(false);
        }
      }, 500);
    }
  }, [selectedOccasion]);

  const handleBack = () => {
    setSelectedOccasion(null);
    setOutfits([]);
    setCustomOccasion('');
  };

  return (
    <div className="occasion-suggestions">
      {!selectedOccasion ? (
        <div className="occasion-selection">
          <h1>Select or Describe Your Occasion</h1>
          
          <form onSubmit={handleCustomOccasionSubmit} className="custom-occasion-form">
            <input
              type="text"
              value={customOccasion}
              onChange={(e) => setCustomOccasion(e.target.value)}
              placeholder="e.g., Beach wedding, Job interview..."
              className="occasion-input"
            />
            <button type="submit" className="submit-button">
              Get Suggestions
            </button>
          </form>
          
          <div className="divider">OR</div>
          
          <h2>Choose from common occasions:</h2>
          <div className="occasion-grid">
            {occasions.map((occasion) => (
              <button
                key={occasion.id}
                className="occasion-card"
                onClick={() => handleOccasionSelect(occasion.id)}
              >
                <span className="occasion-icon">{occasion.icon}</span>
                <span className="occasion-name">{occasion.name}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="outfit-results">
          <button onClick={handleBack} className="back-button">
            ← Back to Occasion Selection
          </button>
          
          <h2>
            {selectedOccasion === 'custom' 
              ? `Outfits for "${customOccasion}"`
              : `Outfits for ${occasions.find(o => o.id === selectedOccasion)?.name || selectedOccasion}`}
          </h2>
          
          {loading && <div className="loading-spinner">Loading outfits...</div>}
          {error && <div className="error-message">{error}</div>}
          
          {outfits.length > 0 ? (
            <OutfitDisplay outfits={outfits} />
          ) : (
            !loading && (
              <div className="no-outfits">
                <p>No specific outfits found for this occasion.</p>
                <p>Here are some versatile options:</p>
                <OutfitDisplay outfits={[
                  ...outfitDatabase.casual.slice(0, 2),
                  ...outfitDatabase.work.slice(0, 1)
                ]} />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default OccasionOutfit;