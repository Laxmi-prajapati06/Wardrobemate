const express = require('express');
const router = express.Router();
const SkinToneController = require('../controllers/SkinToneController');
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/auth');

router.post(
  '/analyze',
  authMiddleware,
  (req, res, next) => {
    console.log('Skin tone analysis route hit');
    next();
  },
  upload.single('image'),
  (req, res, next) => {
    console.log('File upload completed');
    next();
  },
  SkinToneController.analyze
);

// Debug endpoint to test file upload
router.post('/test-upload', 
  upload.single('image'),
  (req, res) => {
    try {
      console.log('Test upload - File:', req.file);
      console.log('Test upload - Body:', req.body);
      
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      res.json({
        message: 'File uploaded successfully',
        file: {
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
          path: req.file.path
        }
      });
    } catch (error) {
      console.error('Test upload error:', error);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;