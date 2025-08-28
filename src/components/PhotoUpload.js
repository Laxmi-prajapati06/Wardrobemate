import React, { useState, useRef } from 'react';
import '../styles/components.css';

const PhotoUpload = ({ userData, updateUserData }) => {
  const [, setPhoto] = useState(userData.photo || null);
  const [preview, setPreview] = useState(null);
  const [skinTone, setSkinTone] = useState(userData.skinTone || '');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size too large (max 5MB)');
      return;
    }

    setError(null);
    setIsUploading(true);
    setPhoto(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      analyzeSkinTone(reader.result);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setError('Failed to read file');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      fileInputRef.current.files = e.dataTransfer.files;
      handlePhotoChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const analyzeSkinTone = (imageData) => {
    // Simulate analysis with loading delay
    setTimeout(() => {
      const tones = ['Fair', 'Light', 'Medium', 'Olive', 'Tan', 'Deep'];
      const undertones = ['Cool', 'Warm', 'Neutral'];
      const randomTone = tones[Math.floor(Math.random() * tones.length)];
      const randomUndertone = undertones[Math.floor(Math.random() * undertones.length)];
      
      const detectedTone = `${randomTone} (${randomUndertone} undertone)`;
      setSkinTone(detectedTone);
      updateUserData('skinTone', detectedTone);
    }, 1500);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="photo-upload">
      <h2>Upload Your Photo for Skin Tone Analysis</h2>
      <p className="upload-instructions">
        For best results, upload a clear, well-lit photo of your face with natural lighting.
      </p>
      
      <div 
        className={`upload-area ${isUploading ? 'uploading' : ''}`}
        onClick={triggerFileInput}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          accept="image/*"
          onChange={handlePhotoChange}
          className="file-input"
          ref={fileInputRef}
        />
        
        {isUploading ? (
          <div className="upload-loading">
            <div className="spinner"></div>
            <p>Analyzing your photo...</p>
          </div>
        ) : preview ? (
          <div className="photo-preview">
            <img src={preview} alt="Uploaded preview" />
            <button 
              className="change-photo-btn"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current.value = '';
                setPreview(null);
                setSkinTone('');
                updateUserData('skinTone', '');
              }}
            >
              Change Photo
            </button>
          </div>
        ) : (
          <div className="upload-prompt">
            <div className="upload-icon">
              <svg viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </div>
            <p>Drag & drop your photo here or click to browse</p>
            <p className="upload-hint">Supports: JPG, PNG (Max 5MB)</p>
          </div>
        )}
      </div>

      {error && (
        <div className="upload-error">
          <p>{error}</p>
        </div>
      )}

      {skinTone && (
        <div className="skin-tone-result">
          <h3>Analysis Complete</h3>
          <div className="tone-display">
            <div className="tone-color"></div>
            <div className="tone-info">
              <p className="tone-category">Skin Tone:</p>
              <p className="tone-value">{skinTone}</p>
            </div>
          </div>
          <p className="tone-description">
            We'll use this to recommend colors that complement your complexion.
          </p>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;