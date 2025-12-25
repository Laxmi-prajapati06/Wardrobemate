import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SkinToneUpload from '../components/SkinToneUpload';
import SkinToneResult from '../components/SkinToneResult';
import { analyzeSkinTone } from '../services/skinToneService';

const SkinTonePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpload = async (file) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      console.log('Starting skin tone analysis for file:', file.name);
      const analysisResult = await analyzeSkinTone(currentUser.id, file);
      console.log('Analysis result:', analysisResult);
      
      if (analysisResult.error) {
        throw new Error(analysisResult.error);
      }
      
      const skinTone = analysisResult.skin_tone || analysisResult.skinTone;
      const colors = analysisResult.dominant_colors || analysisResult.dominantColors || analysisResult.colors;
      
      if (!skinTone || !colors) {
        throw new Error('Invalid response format from server');
      }
      
      setResult({
        skinTone,
        colors,
        faceDetected: analysisResult.face_detected
      });
      
      setSuccess('Skin tone analysis completed successfully!');
    } catch (err) {
      console.error('Skin tone analysis failed:', err);
      setError(err.message || 'Failed to analyze image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    navigate('/recommendations');
  };

  const handleRetry = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="skin-tone-page">
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">
            <span className="material-icons">palette</span>
            Skin Tone Analysis
          </h1>
          <p className="page-subtitle">
            Discover your skin tone and find colors that complement you perfectly
          </p>
        </div>
      </div>

      <div className="page-container">
        {error && (
          <div className="alert alert-error">
            <span className="material-icons">error</span>
            <span>{error}</span>
            <button onClick={handleRetry} className="btn-retry">
              Try Again
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

        <div className="skin-tone-content">
          {!result ? (
            <SkinToneUpload onUpload={handleUpload} isLoading={isLoading} />
          ) : (
            <SkinToneResult 
              skinTone={result.skinTone} 
              colors={result.colors} 
              onContinue={handleContinue}
              faceDetected={result.faceDetected}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SkinTonePage;