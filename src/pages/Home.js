import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Find Your Perfect Outfit</h1>
        <p>Get personalized clothing recommendations based on your body type, skin tone, and occasion</p>
        <Link to="/measurements" className="cta-button">Get Started</Link>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">📏</div>
          <h3>Body Type Analysis</h3>
          <p>Discover outfits that flatter your unique shape</p>
          <Link to="/body-type-input" className="cta-button">Get Started</Link>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎨</div>
          <h3>Color Suggestions</h3>
          <p>Find colors that complement your skin tone</p>
          <Link to="/photo-upload" className="cta-button">Get Started</Link>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎉</div>
          <h3>Occasion-Based Outfits</h3>
          <p>Get appropriate outfits for any event</p>
          <Link to="/occasion-outfits" className='cta-button'>Get Started</Link>
        </div>
      </div>

      <div className="how-it-works">
        <h2>How It Works</h2>
        <ol className="steps">
          <li>Enter your body measurements</li>
          <li>Upload a photo for skin tone analysis</li>
          <li>Select your occasion</li>
          <li>Get personalized recommendations!</li>
        </ol>
      </div>
    </div>
  );
};

export default Home;