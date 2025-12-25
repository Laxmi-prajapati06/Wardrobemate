import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="hero-title-gradient">Discover Your</span>
              <span className="hero-title-gradient">Perfect Style</span>
            </h1>
            <p className="hero-subtitle">
              Personalized outfit recommendations based on your unique body type and skin tone
            </p>
          </div>

          <div className="hero-actions">
            {currentUser ? (
              <div className="hero-user-content">
                <div className="user-welcome">
                  <div className="welcome-icon">
                    <span className="material-icons">waving_hand</span>
                  </div>
                  <div className="welcome-text">
                    <h3>Welcome back, <span className="user-name">{currentUser.name}</span>!</h3>
                    <p className="welcome-message">Ready to explore your perfect style?</p>
                  </div>
                </div>
                <div className="action-cards">
                  <Link to="/body-type" className="action-card primary">
                    <div className="card-icon-wrapper">
                      <div className="card-icon">
                        <span className="material-icons">straighten</span>
                      </div>
                      <div className="card-glow"></div>
                    </div>
                    <div className="card-content">
                      <h4 className="card-title">Analyze Body Type</h4>
                      <p className="card-description">Discover your body shape and get personalized recommendations</p>
                    </div>
                    <div className="card-action">
                      <span className="action-label">Get Started</span>
                      <span className="material-icons arrow-icon">arrow_forward</span>
                    </div>
                    <div className="card-hover-effect"></div>
                  </Link>
                  
                  <Link to="/skin-tone" className="action-card secondary">
                    <div className="card-icon-wrapper">
                      <div className="card-icon">
                        <span className="material-icons">palette</span>
                      </div>
                      <div className="card-glow"></div>
                    </div>
                    <div className="card-content">
                      <h4 className="card-title">Analyze Skin Tone</h4>
                      <p className="card-description">Find your perfect colors based on your skin tone</p>
                    </div>
                    <div className="card-action">
                      <span className="action-label">Explore Colors</span>
                      <span className="material-icons arrow-icon">arrow_forward</span>
                    </div>
                    <div className="card-hover-effect"></div>
                  </Link>
                  
                  <Link to="/recommendations" className="action-card accent">
                    <div className="card-icon-wrapper">
                      <div className="card-icon">
                        <span className="material-icons">style</span>
                      </div>
                      <div className="card-glow"></div>
                    </div>
                    <div className="card-content">
                      <h4 className="card-title">Get Recommendations</h4>
                      <p className="card-description">View personalized outfits curated for you</p>
                    </div>
                    <div className="card-action">
                      <span className="action-label">View Outfits</span>
                      <span className="material-icons arrow-icon">arrow_forward</span>
                    </div>
                    <div className="card-hover-effect"></div>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hero-guest-content">
                <div className="guest-message">
                  <h3>Join Our Style Community</h3>
                  <p>Thousands of users have found their perfect style match</p>
                </div>
                <div className="auth-buttons">
                  <Link to="/login" className="auth-button primary">
                    <span className="material-icons">login</span>
                    <span>Log In</span>
                    <div className="button-shine"></div>
                  </Link>
                  <Link to="/register" className="auth-button secondary">
                    <span className="material-icons">person_add</span>
                    <span>Register</span>
                    <div className="button-shine"></div>
                  </Link>
                </div>
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <span className="material-icons">body</span>
                    </div>
                    <h4>Body Type Analysis</h4>
                    <p>Discover your unique body shape</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">
                      <span className="material-icons">palette</span>
                    </div>
                    <h4>Skin Tone Matching</h4>
                    <p>Find colors that complement you</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">
                      <span className="material-icons">style</span>
                    </div>
                    <h4>Personalized Outfits</h4>
                    <p>Get custom recommendations</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;