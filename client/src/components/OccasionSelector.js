import React from 'react';

const occasions = [
  { value: 'casual', label: 'Casual Day Out' },
  { value: 'business', label: 'Business/Work' },
  { value: 'formal', label: 'Formal Event' },
  { value: 'date', label: 'Date Night' },
  { value: 'party', label: 'Party/Night Out' },
  { value: 'wedding', label: 'Wedding' },
];

const OccasionSelector = ({ selected, onSelect }) => {
  return (
    <div className="occasion-selector">
      <h3 className="text-center mb-3">Select an occasion:</h3>
      <div className="occasion-grid">
        {occasions.map((occasion) => (
          <button
            key={occasion.value}
            type="button"
            onClick={() => onSelect(occasion.value)}
            className={`occasion-btn ${selected === occasion.value ? 'active' : ''}`}
          >
            {occasion.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OccasionSelector;