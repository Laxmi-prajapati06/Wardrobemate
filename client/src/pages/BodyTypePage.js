import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BodyTypeForm from '../components/BodyTypeForm';
import BodyTypeResult from '../components/BodyTypeResult';
import { calculateBodyType } from '../utils/bodyTypeCalculator';
import { saveBodyMeasurements } from '../services/userService';

const BodyTypePage = () => {
  const { currentUser } = useAuth();
  const [bodyType, setBodyType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (measurements) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const calculatedBodyType = calculateBodyType(measurements);
      await saveBodyMeasurements(currentUser.id, {
        ...measurements,
        bodyType: calculatedBodyType
      });
      setBodyType(calculatedBodyType);
      setSuccess('Body type analysis completed successfully!');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to save body measurements. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    navigate('/skin-tone');
  };

  return (
    <div className="body-type-page">
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">
            <span className="material-icons">straighten</span>
            Body Type Analysis
          </h1>
          <p className="page-subtitle">
            Discover your unique body shape for personalized style recommendations
          </p>
        </div>
      </div>

      <div className="page-container">
        {error && (
          <div className="alert alert-error">
            <span className="material-icons">error</span>
            <span>{error}</span>
            <button onClick={() => setError(null)} className="alert-close">
              <span className="material-icons">close</span>
            </button>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <span className="material-icons">check_circle</span>
            <span>{success}</span>
            <button onClick={() => setSuccess(null)} className="alert-close">
              <span className="material-icons">close</span>
            </button>
          </div>
        )}
        
        {!bodyType ? (
          <BodyTypeForm onSubmit={handleSubmit} isLoading={isLoading} />
        ) : (
          <BodyTypeResult bodyType={bodyType} onContinue={handleContinue} />
        )}
      </div>
    </div>
  );
};

export default BodyTypePage;