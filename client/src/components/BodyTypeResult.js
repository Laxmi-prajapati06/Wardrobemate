import React from 'react';
import { bodyTypeDescriptions } from '../utils/bodyTypeCalculator';

const BodyTypeResult = ({ bodyType, onContinue }) => {
  const description = bodyTypeDescriptions[bodyType];

  return (
    <div className="body-type-result glass-card">
      <div className="result-header">
        <div className="result-icon">
          <span className="material-icons">task_alt</span>
        </div>
        <div className="result-title">
          <h2>Analysis Complete!</h2>
          <p>Your body type has been determined</p>
        </div>
      </div>

      <div className="result-content">
        <div className="body-type-display">
          <div className="body-type-card">
            <h3 className="body-type-name">{description.name}</h3>
            <div className="body-type-icon">
              {bodyType === 'hourglass' && '⏳'}
              {bodyType === 'pear' && '🍐'}
              {bodyType === 'apple' && '🍎'}
              {bodyType === 'rectangle' && '📦'}
              {bodyType === 'inverted_triangle' && '🔻'}
            </div>
          </div>
        </div>

        <div className="result-description">
          <p className="description-text">{description.description}</p>
        </div>

        <div className="style-recommendations">
          <h4 className="recommendations-title">
            <span className="material-icons">style</span>
            Recommended Styles
          </h4>
          <ul className="recommendations-list">
            {description.recommendations.map((item, index) => (
              <li key={index} className="recommendation-item">
                <span className="material-icons">check</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="result-actions">
          <button
            onClick={onContinue}
            className="btn-continue"
          >
            <span className="material-icons">arrow_forward</span>
            Continue to Skin Tone Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default BodyTypeResult;