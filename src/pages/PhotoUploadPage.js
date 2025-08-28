import React from 'react';
import PhotoUpload from '../components/PhotoUpload';
import { Link } from 'react-router-dom';
import '../styles/components.css';

const PhotoUploadPage = ({ userData, updateUserData }) => {
  return (
    <div className="photo-upload-page">
      <h1>Skin Tone Analysis</h1>
      <p>Upload a clear photo of your face in natural lighting for accurate skin tone analysis.</p>
      
      <PhotoUpload userData={userData} updateUserData={updateUserData} />
      
      <div className="navigation-buttons">
        <Link to="/measurements" className="nav-button">Back</Link>
        
          <Link to="/occasion" className="nav-button primary">Continue to Occasion Selection</Link>
        
      </div>
    </div>
  );
};

export default PhotoUploadPage;