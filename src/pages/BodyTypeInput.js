import React, { useState } from 'react';
import '../styles/components.css';

const BodyTypeInput = () => {
  const [measurements, setMeasurements] = useState({
    bust: '',
    waist: '',
    hips: '',
    height: ''
  });


  const [bodyType, setBodyType] = useState('');
  const [showResults, setShowResults] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const determineBodyType = () => {
    const { bust, waist, hips } = measurements;
    
    if (!bust || !waist || !hips) {
      return 'Please complete all measurements';
    }

    const bustNum = parseFloat(bust);
    const waistNum = parseFloat(waist);
    const hipsNum = parseFloat(hips);

    // Calculate ratios
    const waistToHipRatio = waistNum / hipsNum;
    const bustToHipRatio = bustNum / hipsNum;

    // Determine body type based on ratios
    if (waistToHipRatio < 0.75 && bustToHipRatio >= 0.9) {
      return 'Hourglass';
    } else if (waistToHipRatio >= 0.75 && bustToHipRatio <= 0.9) {
      return 'Rectangle';
    } else if (waistToHipRatio >= 0.75 && bustToHipRatio > 0.9) {
      return 'Inverted Triangle';
    } else if (waistToHipRatio < 0.75 && bustToHipRatio <= 0.9) {
      return 'Pear';
    } else {
      return 'Undetermined';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedBodyType = determineBodyType();
    setBodyType(calculatedBodyType);
    setShowResults(true);
  };

  const bodyTypeDescriptions = {
    'Hourglass': 'Balanced bust and hips with a defined waist',
    'Pear': 'Hips wider than bust with a defined waist',
    'Rectangle': 'Bust, waist and hips similar in measurement',
    'Inverted Triangle': 'Bust wider than hips with less-defined waist',
    'Undetermined': 'Unable to determine based on provided measurements',
    'Please complete all measurements': 'Please fill in all measurement fields'
  };

  return (
    <div className="body-type-input">
      <h2>Body Type Calculator</h2>
      <p>Enter your measurements to determine your body shape and get personalized recommendations.</p>
      
      <form onSubmit={handleSubmit} className="measurement-form">
        <div className="input-group">
          <label>Bust (inches)</label>
          <input
            type="number"
            name="bust"
            value={measurements.bust}
            onChange={handleChange}
            min="20"
            max="60"
            step="0.5"
            required
          />
        </div>
        
        <div className="input-group">
          <label>Waist (inches)</label>
          <input
            type="number"
            name="waist"
            value={measurements.waist}
            onChange={handleChange}
            min="20"
            max="60"
            step="0.5"
            required
          />
        </div>
        
        <div className="input-group">
          <label>Hips (inches)</label>
          <input
            type="number"
            name="hips"
            value={measurements.hips}
            onChange={handleChange}
            min="20"
            max="60"
            step="0.5"
            required
          />
        </div>
        
        <div className="input-group">
          <label>Height (inches)</label>
          <input
            type="number"
            name="height"
            value={measurements.height}
            onChange={handleChange}
            min="48"
            max="84"
            step="0.5"
            required
          />
        </div>
        
        <button type="submit" className="calculate-btn">
          Calculate Body Type
        </button>
      </form>
      
      {showResults && (
        <div className={`results-container ${bodyType.toLowerCase().replace(' ', '-')}`}>
          <h3>Your Body Type: <span className="body-type">{bodyType}</span></h3>
          <p className="description">{bodyTypeDescriptions[bodyType]}</p>
          
          <div className="body-shape-visual">
            {/* Visual representation of body type */}
            {bodyType === 'Hourglass' && (
              <div className="hourglass-shape">
                <div className="top-curve"></div>
                <div className="waist"></div>
                <div className="bottom-curve"></div>
              </div>
            )}
            {bodyType === 'Pear' && (
              <div className="pear-shape">
                <div className="top"></div>
                <div className="waist"></div>
                <div className="bottom-curve"></div>
              </div>
            )}
            {bodyType === 'Rectangle' && (
              <div className="rectangle-shape">
                <div className="top"></div>
                <div className="mid"></div>
                <div className="bottom"></div>
              </div>
            )}
            {bodyType === 'Inverted Triangle' && (
              <div className="inverted-triangle-shape">
                <div className="top-curve"></div>
                <div className="waist"></div>
                <div className="bottom"></div>
              </div>
            )}
          </div>
          
          <div className="tips-preview">
            <h4>Quick Styling Tips</h4>
            <ul>
              {bodyType === 'Hourglass' && (
                <>
                  <li>Emphasize your waist with belts</li>
                  <li>Choose fitted styles that follow your curves</li>
                  <li>Wrap dresses are your best friend</li>
                </>
              )}
              {bodyType === 'Pear' && (
                <>
                  <li>Draw attention upward with statement necklines</li>
                  <li>Wear A-line skirts to balance proportions</li>
                  <li>Choose darker colors on bottom</li>
                </>
              )}
              {bodyType === 'Rectangle' && (
                <>
                  <li>Create curves with peplum tops</li>
                  <li>Try layered looks to add dimension</li>
                  <li>Use belts to define your waist</li>
                </>
              )}
              {bodyType === 'Inverted Triangle' && (
                <>
                  <li>Balance with wider leg pants</li>
                  <li>Choose V-neck tops to elongate</li>
                  <li>Wear darker colors on top</li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyTypeInput;