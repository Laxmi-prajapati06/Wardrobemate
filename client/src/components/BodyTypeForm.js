import React, { useState } from 'react';

const BodyTypeForm = ({ onSubmit, isLoading }) => {
  const [measurements, setMeasurements] = useState({
    height: '',
    weight: '',
    bust: '',
    waist: '',
    hips: ''
  });

  const [unitSystem, setUnitSystem] = useState('cm');

  const handleChange = (e) => {
    setMeasurements({
      ...measurements,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const convertedMeasurements = unitSystem === 'inches' 
      ? convertToCm(measurements)
      : measurements;
    onSubmit(convertedMeasurements);
  };

  const convertToCm = (values) => {
    const conversionFactor = 2.54;
    return {
      height: Math.round(values.height * conversionFactor),
      weight: Math.round(values.weight * 0.453592),
      bust: Math.round(values.bust * conversionFactor),
      waist: Math.round(values.waist * conversionFactor),
      hips: Math.round(values.hips * conversionFactor)
    };
  };

  const measurementFields = [
    {
      key: 'height',
      label: 'Height',
      icon: 'straighten',
      unit: unitSystem === 'cm' ? 'cm' : 'in',
      hint: 'Measure without shoes'
    },
    {
      key: 'weight',
      label: 'Weight',
      icon: 'monitor_weight',
      unit: unitSystem === 'cm' ? 'kg' : 'lbs',
      hint: 'Current weight'
    },
    {
      key: 'bust',
      label: 'Bust/Chest',
      icon: 'female',
      unit: unitSystem === 'cm' ? 'cm' : 'in',
      hint: 'Fullest part around chest'
    },
    {
      key: 'waist',
      label: 'Waist',
      icon: 'horizontal_rule',
      unit: unitSystem === 'cm' ? 'cm' : 'in',
      hint: 'Narrowest part'
    },
    {
      key: 'hips',
      label: 'Hips',
      icon: 'female',
      unit: unitSystem === 'cm' ? 'cm' : 'in',
      hint: 'Fullest part around hips'
    }
  ];

  return (
    <div className="body-type-form">
      <div className="form-header">
        <h2 className="form-title">Body Measurements</h2>
        <p className="form-subtitle">
          Enter your measurements to determine your body type
        </p>
      </div>

      <form onSubmit={handleSubmit} className="measurement-form">
        <div className="unit-selector">
          <label className="unit-label">Units:</label>
          <div className="unit-toggle">
            <button
              type="button"
              className={`unit-option ${unitSystem === 'cm' ? 'active' : ''}`}
              onClick={() => setUnitSystem('cm')}
            >
              Metric (cm/kg)
            </button>
            <button
              type="button"
              className={`unit-option ${unitSystem === 'inches' ? 'active' : ''}`}
              onClick={() => setUnitSystem('inches')}
            >
              Imperial (in/lbs)
            </button>
          </div>
        </div>

        <div className="measurement-fields">
          {measurementFields.map((field) => (
            <div key={field.key} className="measurement-field">
              <div className="field-header">
                <span className="material-icons field-icon">{field.icon}</span>
                <label className="field-label">
                  {field.label}
                  <span className="field-unit">({field.unit})</span>
                </label>
              </div>
              <input
                type="number"
                name={field.key}
                value={measurements[field.key]}
                onChange={handleChange}
                className="measurement-input"
                placeholder={`Enter ${field.label.toLowerCase()}`}
                required
                min="0"
                step="0.1"
              />
              <div className="field-hint">{field.hint}</div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-submit"
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Analyzing...
            </>
          ) : (
            'Analyze Body Type'
          )}
        </button>
      </form>

      <div className="measurement-help">
        <p className="help-title">Measurement Tips:</p>
        <ul className="help-list">
          <li>Use a soft measuring tape</li>
          <li>Measure against your skin</li>
          <li>Keep the tape parallel to the ground</li>
          <li>Stand straight and breathe normally</li>
        </ul>
      </div>
    </div>
  );
};

export default BodyTypeForm;