import React, { useState } from 'react';
import './styles/components.css';

const SkinToneAnalyzer = ({ photo, onAnalysisComplete }) => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeSkinTone = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis (in a real app, you'd use an actual image processing library)
    setTimeout(() => {
      const tones = ['Fair', 'Light', 'Medium', 'Olive', 'Tan', 'Deep'];
      const undertones = ['Cool', 'Warm', 'Neutral'];
      
      const randomTone = tones[Math.floor(Math.random() * tones.length)];
      const randomUndertone = undertones[Math.floor(Math.random() * undertones.length)];
      
      const result = {
        tone: randomTone,
        undertone: randomUndertone,
        description: `Your skin tone is ${randomTone.toLowerCase()} with ${randomUndertone.toLowerCase()} undertones`
      };
      
      setAnalysisResult(result);
      onAnalysisComplete(result);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="skin-tone-analyzer">
      {photo && (
        <div className="analysis-section">
          <div className="photo-preview">
            <img src={URL.createObjectURL(photo)} alt="Preview" />
          </div>
          
          {!analysisResult ? (
            <button 
              onClick={analyzeSkinTone} 
              className="analyze-btn"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Skin Tone'}
            </button>
          ) : (
            <div className="analysis-result">
              <h3>Analysis Results</h3>
              <p><strong>Tone:</strong> {analysisResult.tone}</p>
              <p><strong>Undertone:</strong> {analysisResult.undertone}</p>
              <p>{analysisResult.description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkinToneAnalyzer;