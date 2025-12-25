const SkinTone = require('../models/SkinTone');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

class SkinToneController {
  static async analyze(req, res, next) {
    try {
      console.log('Skin tone analysis started...');
      
      if (!req.file) {
        console.log('No file uploaded');
        return res.status(400).json({ error: 'No image uploaded' });
      }

      console.log('File uploaded:', req.file);

      // Call Python ML API
      const formData = new FormData();
      formData.append('image', fs.createReadStream(req.file.path));
      
      const ML_URL = process.env.ML_API_URL || 'http://127.0.0.1:5000';
      const response = await axios.post(`${ML_URL}/analyze`, formData, {
        headers: {
          ...formData.getHeaders(),
        },
        timeout: 30000
      });
      
      const result = response.data;
      console.log('ML API response:', result);

      // Save to database
      const skinTone = await SkinTone.create({
        userId: req.user.id,
        skinTone: result.skin_tone,
        dominantColors: result.dominant_colors,
        imagePath: req.file.path
      });

      console.log('Skin tone analysis saved to database');

      // Clean up uploaded file
      try {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
          console.log('Temporary file cleaned up');
        }
      } catch (cleanupError) {
        console.warn('Could not clean up temporary file:', cleanupError.message);
      }

      // Return the result in a consistent format
      res.json({
        skinTone: result.skin_tone,
        colors: result.dominant_colors,
        faceDetected: result.face_detected
      });
      
    } catch (error) {
      console.error('Skin tone analysis error:', error.message);
      
      // Clean up uploaded file even if there's an error
      if (req.file && fs.existsSync(req.file.path)) {
        try {
          fs.unlinkSync(req.file.path);
          console.log('Temporary file cleaned up after error');
        } catch (cleanupError) {
          console.warn('Could not clean up temporary file after error:', cleanupError.message);
        }
      }
      
      if (error.response) {
        // Forward the error from the ML server
        res.status(error.response.status).json({ error: error.response.data.error });
      } else {
        res.status(500).json({ error: 'Failed to analyze image. Please try again.' });
      }
    }
  }
}

module.exports = SkinToneController;