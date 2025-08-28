import React, { useState } from 'react';
import { OpenAI } from 'openai';
import '../styles/components.css';

const PromptGenerator = ({ userData, onOutfitGenerated, setLoading, setError }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedOutfit, setGeneratedOutfit] = useState('');
  const [isGenerating] = useState(false);
  const [occasion, setOccasion] = useState('');
  const [stylePreferences, setStylePreferences] = useState([]);
  const [apiError, setApiError] = useState(null);

  // Initialize OpenAI with better error handling
  let openai;
  try {
    openai = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  } catch (error) {
    console.error("OpenAI initialization error:", error);
    setApiError("Failed to initialize AI service. Please refresh the page.");
  }

  // Style and occasion options
  const styleOptions = ['Classic', 'Bohemian', 'Streetwear', 'Minimalist', 'Athleisure', 'Romantic', 'Edgy', 'Professional'];
  const occasionOptions = ['Casual Day Out', 'Work/Office', 'Date Night', 'Formal Event', 'Party', 'Vacation', 'Workout'];

  const generatePrompt = () => {
    if (!userData?.bodyType || !occasion) {
      alert('Please complete your profile and select an occasion');
      return;
    }

    const basePrompt = `Create a complete outfit recommendation for a ${userData.bodyType} body type`;
    const skinTonePrompt = userData.skinTone ? ` with ${userData.skinTone} skin tone` : '';
    const occasionPrompt = ` for a ${occasion} event`;
    const stylePrompt = stylePreferences.length > 0 
      ? ` in ${stylePreferences.join(', ')} style` 
      : '';
    const measurementsPrompt = userData.measurements 
      ? `. Measurements: bust ${userData.measurements.bust}", waist ${userData.measurements.waist}", hips ${userData.measurements.hips}"`
      : '';
    
    const fullPrompt = `${basePrompt}${skinTonePrompt}${occasionPrompt}${stylePrompt}${measurementsPrompt}. 
      Include: 1) Top, 2) Bottom, 3) Footwear, 4) Accessories, and 5) Styling tips. 
      Make it fashionable yet practical. Provide specific clothing items and brands when possible.`;
    
    setPrompt(fullPrompt);
    setApiError(null); // Reset error when generating new prompt
  };

  const generateOutfit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Validate OpenAI instance
      if (!openai) {
        throw new Error("AI service not initialized");
      }

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: "You are a professional fashion stylist. Provide detailed outfit recommendations with specific clothing items, brands (when possible), and clear styling tips for the given body type. Format your response with clear sections for each component of the outfit." 
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      if (!response?.choices?.[0]?.message?.content) {
        throw new Error("Received empty response from AI");
      }

      setGeneratedOutfit(response.choices[0].message.content);
      const content = response.choices[0]?.message?.content;
      if (content) {
        onOutfitGenerated(content); // Send to parent component
      }
    } catch (error) {
        setError(error.message);
        onOutfitGenerated(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

  const handleStyleToggle = (style) => {
    setStylePreferences(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style) 
        : [...prev, style]
    );
  };

  return (
    <div className="prompt-generator">
      <h2>Outfit Recommendation Generator</h2>
      
      {apiError && (
        <div className="error-message">
          <p>{apiError}</p>
          <button onClick={() => setApiError(null)}>Dismiss</button>
        </div>
      )}
      
      <div className="input-section">
        <h3>Select Occasion</h3>
        <div className="occasion-options">
          {occasionOptions.map(occ => (
            <button
              key={occ}
              className={`option-btn ${occasion === occ ? 'active' : ''}`}
              onClick={() => setOccasion(occ)}
            >
              {occ}
            </button>
          ))}
        </div>

        <h3>Style Preferences (Optional)</h3>
        <div className="style-options">
          {styleOptions.map(style => (
            <button
              key={style}
              className={`option-btn ${stylePreferences.includes(style) ? 'active' : ''}`}
              onClick={() => handleStyleToggle(style)}
            >
              {style}
            </button>
          ))}
        </div>

        <button 
          className="generate-btn" 
          onClick={generatePrompt}
          disabled={!userData?.bodyType || !occasion}
        >
          Generate Fashion Prompt
        </button>
      </div>

      {prompt && (
        <div className="prompt-section">
          <h3>Generated Prompt</h3>
          <div className="prompt-box">
            <p>{prompt}</p>
            <button 
              className="generate-btn" 
              onClick={generateOutfit}
              disabled={isGenerating || !prompt}
            >
              {isGenerating ? 'Generating...' : 'Generate Outfit'}
            </button>
          </div>
        </div>
      )}

      {generatedOutfit && (
        <div className="outfit-results">
          <h3>Recommended Outfit</h3>
          <div className="outfit-box">
            {generatedOutfit.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptGenerator;