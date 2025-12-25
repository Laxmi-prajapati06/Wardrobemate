import React, { useCallback, useState } from 'react';

const SkinToneUpload = ({ onUpload, isLoading }) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="skin-tone-upload">
      <h2>Upload Your Photo</h2>
      <p className="mb-4">
        For best results, upload a well-lit photo of your face without makeup.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          {preview ? (
            <div className="mb-4">
              <img 
                src={preview} 
                alt="Preview" 
                className="rounded-lg shadow-md max-w-full h-auto"
              />
            </div>
          ) : (
            <div className="upload-area">
              <p>Drag and drop your photo here, or click to select</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={!file || isLoading}
          className="btn btn-primary btn-block"
        >
          {isLoading ? (
            <>
              <span className="loading-spinner mr-2"></span>
              Analyzing...
            </>
          ) : 'Analyze Skin Tone'}
        </button>
      </form>
    </div>
  );
};

export default SkinToneUpload;