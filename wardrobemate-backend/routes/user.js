/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { validateMeasurements } = require('../utils/validators');
const { processImage } = require('../services/image');

router.post('/measurements', protect, validateMeasurements, async (req, res, next) => {
  try {
    // Implementation from user controller
    res.status(200).json({ success: true, data: measurements });
  } catch (error) {
    next(error);
  }
});

router.post('/upload-photo', protect, async (req, res, next) => {
  try {
    if (!req.files || !req.files.photo) {
      return res.status(400).json({ message: 'Please upload a photo' });
    }
    
    const photoUrl = await processImage(req.files.photo, req.user.id);
    // Save to database
    res.status(200).json({ success: true, data: photoUrl });
  } catch (error) {
    next(error);
  }
});



module.exports = router;

