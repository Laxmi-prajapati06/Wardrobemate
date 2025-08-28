import React, { useState } from 'react';
import '../styles/components.css';

const MeasurementInput = ({ userData, updateUserData }) => {
  const [measurements, setMeasurements] = useState(userData.measurements || {
    bust: '',
    waist: '',
    hips: '',
    height: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData('measurements', measurements);
    // Determine body type based on measurements
    const bodyType = determineBodyType(measurements);
    updateUserData('bodyType', bodyType);
    alert('Measurements saved! Your body type is: ' + bodyType);
  };

  const determineBodyType = (measurements) => {
    const { bust, waist, hips } = measurements;
    if (!bust || !waist || !hips) return 'Unknown';
    
    const bustNum = parseFloat(bust);
    const waistNum = parseFloat(waist);
    const hipsNum = parseFloat(hips);
    
    const waistToHipRatio = waistNum / hipsNum;
    const bustToHipRatio = bustNum / hipsNum;

    if (waistToHipRatio < 0.75 && bustToHipRatio > 0.9) return 'Hourglass';
    if (waistToHipRatio >= 0.75 && bustToHipRatio <= 0.9) return 'Rectangle';
    if (waistToHipRatio >= 0.75 && bustToHipRatio > 0.9) return 'Inverted Triangle';
    if (waistToHipRatio < 0.75 && bustToHipRatio <= 0.9) return 'Pear';
    return 'Unknown';
  };

  return (
    <div className="measurement-form">
      <h2>Enter Your Body Measurements</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Bust (inches):</label>
          <input 
            type="number" 
            name="bust" 
            value={measurements.bust} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Waist (inches):</label>
          <input 
            type="number" 
            name="waist" 
            value={measurements.waist} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Hips (inches):</label>
          <input 
            type="number" 
            name="hips" 
            value={measurements.hips} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Height (inches):</label>
          <input 
            type="number" 
            name="height" 
            value={measurements.height} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="submit-btn">Save Measurements</button>
      </form>
    </div>
  );
};

export default MeasurementInput;