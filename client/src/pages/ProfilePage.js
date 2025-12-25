import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/userService';
// UPDATED IMPORTS
import { 
  getSavedRecommendations, 
  getUserPreferences, 
  removeSavedRecommendation 
} from '../services/recommendationService';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [savedOutfits, setSavedOutfits] = useState([]);
  const [preferences, setPreferences] = useState({ bodyType: null, skinTone: null });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (currentUser) {
        try {
          setIsLoading(true);
          
          // 1. Fetch User Profile
          const userProfile = await getUserProfile(currentUser.id);
          setProfile(userProfile);
          setFormData({
            name: userProfile.name,
            email: userProfile.email,
          });

          // 2. Fetch User Preferences (Body Type & Skin Tone)
          const userPrefs = await getUserPreferences(currentUser.id);
          setPreferences(userPrefs || { bodyType: null, skinTone: null });

          // 3. Fetch Saved Recommendations
          const saved = await getSavedRecommendations(currentUser.id);
          setSavedOutfits(saved);

        } catch (err) {
          console.error('Error fetching profile data:', err);
          setError('Failed to load profile data');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProfileData();
  }, [currentUser]);

  // Calculate Profile Completion
  const calculateCompletion = () => {
    let progress = 50; // Base: Basic Info + Account Setup
    if (preferences.bodyType) progress += 25;
    if (preferences.skinTone) progress += 25;
    return progress;
  };

  const completionPercentage = calculateCompletion();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const updatedProfile = await updateUserProfile(currentUser.id, formData);
      setProfile(updatedProfile);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveSaved = async (outfitId) => {
    try {
      await removeSavedRecommendation(currentUser.id, outfitId);
      setSavedOutfits(savedOutfits.filter(outfit => outfit.id !== outfitId));
      setSuccess('Outfit removed from saved items');
    } catch (error) {
      console.error('Error removing saved outfit:', error);
      setError('Failed to remove saved outfit');
    }
  };

  if (isLoading && !profile) {
    return (
      <div className="profile-loading">
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-error">
        <div className="error-content">
          <span className="material-icons error-icon">error_outline</span>
          <h3>Failed to load profile</h3>
          <p>Please try refreshing the page</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-retry"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Profile Header Section */}
      <div className="profile-header-section">
        <div className="profile-cover">
          <div className="profile-cover-gradient"></div>
        </div>
        
        <div className="profile-info-card glass-card">
          <div className="profile-avatar-large">
            <div className="avatar-circle">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div className="online-indicator"></div>
          </div>
          
          <div className="profile-info-content">
            <h1 className="profile-name">{profile.name}</h1>
            <p className="profile-email">
              <span className="material-icons">email</span>
              {profile.email}
            </p>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">{savedOutfits.length}</span>
                <span className="stat-label">Saved Outfits</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">{new Date(profile.created_at).getFullYear()}</span>
                <span className="stat-label">Member Since</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setIsEditing(true)}
            className="btn-edit-profile"
          >
            <span className="material-icons">edit</span>
            Edit Profile
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        {/* Left Column - Edit Profile & Completion */}
        <div className="profile-left-column">
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
          
          {isEditing && (
            <div className="edit-profile-card glass-card">
              <h2 className="edit-title">
                <span className="material-icons">manage_accounts</span>
                Edit Profile
              </h2>
              <form onSubmit={handleSubmit} className="edit-profile-form">
                <div className="form-group">
                  <label className="form-label">
                    <span className="material-icons">person</span>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <span className="material-icons">email</span>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                    disabled
                  />
                  <small className="form-hint">Email cannot be changed</small>
                </div>
                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn-save"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-small"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <span className="material-icons">save</span>
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn-cancel"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Profile Completion - UPDATED */}
          <div className="profile-completion glass-card">
            <div className="completion-header">
              <h3>Profile Completion</h3>
              <span className="completion-percent">{completionPercentage}%</span>
            </div>
            
            <div className="completion-bar">
              <div 
                className="completion-progress" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            
            <div className="completion-steps">
              <div className="completion-step completed">
                <span className="material-icons">check_circle</span>
                <span>Basic Info</span>
              </div>
              <div className="completion-step completed">
                <span className="material-icons">check_circle</span>
                <span>Account Setup</span>
              </div>
              
              <div className={`completion-step ${preferences.bodyType ? 'completed' : 'pending'}`}>
                <span className="material-icons">
                  {preferences.bodyType ? 'check_circle' : 'pending'}
                </span>
                <div className="step-info">
                  <span>Body Analysis</span>
                  {preferences.bodyType && <small className="step-detail">Type: {preferences.bodyType}</small>}
                </div>
              </div>
              
              <div className={`completion-step ${preferences.skinTone ? 'completed' : 'pending'}`}>
                <span className="material-icons">
                  {preferences.skinTone ? 'check_circle' : 'pending'}
                </span>
                <div className="step-info">
                  <span>Skin Tone Analysis</span>
                  {preferences.skinTone && <small className="step-detail">Tone: {preferences.skinTone}</small>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Saved Outfits */}
        <div className="profile-right-column">
          <div className="saved-outfits-section">
            <div className="section-header">
              <h2>
                <span className="material-icons">bookmark</span>
                Saved Outfits
              </h2>
              <p>Your collection of favorite styles from recommendations</p>
            </div>
            
            {savedOutfits.length === 0 ? (
              <div className="empty-saved glass-card">
                <div className="empty-icon">
                  <span className="material-icons">bookmark_border</span>
                </div>
                <h3>No Saved Outfits Yet</h3>
                <p>Start exploring recommendations and save outfits you love!</p>
              </div>
            ) : (
              <div className="saved-outfits-grid">
                {savedOutfits.map((outfit) => (
                  <div key={outfit.id} className="saved-outfit-card glass-card">
                    <div className="outfit-image-wrapper">
                      <img 
                        src={outfit.image_url || 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop'} 
                        alt={outfit.name}
                        className="outfit-image"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop';
                        }}
                      />
                      <div className="outfit-actions">
                        <button
                          onClick={() => handleRemoveSaved(outfit.id)}
                          className="btn-remove"
                          title="Remove from saved"
                        >
                          <span className="material-icons">delete</span>
                        </button>
                      </div>
                      <div className="outfit-badge">
                        <span className="badge-occasion">{outfit.occasion}</span>
                        {outfit.isNew && <span className="badge-new">NEW</span>}
                      </div>
                    </div>
                    <div className="outfit-info">
                      <h4 className="outfit-title">{outfit.name}</h4>
                      <p className="outfit-description">{outfit.description}</p>
                      <div className="outfit-meta">
                        <div className="outfit-rating">
                          <span className="material-icons star-icon">star</span>
                          <span>{outfit.rating}</span>
                        </div>
                        <div className="outfit-category">
                          <span className="material-icons category-icon">category</span>
                          <span>{outfit.category}</span>
                        </div>
                      </div>
                      <div className="outfit-tags">
                        {outfit.body_types && outfit.body_types.slice(0, 2).map((type, index) => (
                          <span key={index} className="outfit-tag">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;