const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const BodyMeasurement = require('../models/BodyMeasurement');
const SkinTone = require('../models/SkinTone');

// Get user by ID
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Verify the user is accessing their own data
    if (req.user.id !== parseInt(userId)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove password from response
    delete user.password;

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current user profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // Exclude password from response
    const user = { ...req.user };
    delete user.password;
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user preferences (body type and skin tone)
router.get('/:userId/preferences', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Verify the user is accessing their own data
    if (req.user.id !== parseInt(userId)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Get latest body measurements
    const bodyMeasurements = await BodyMeasurement.findByUserId(userId);
    
    // Get latest skin tone analysis
    const skinTone = await SkinTone.findByUserId(userId);

    res.json({
      bodyType: bodyMeasurements ? bodyMeasurements.body_type : null,
      skinTone: skinTone ? skinTone.skin_tone : null,
      hasBodyData: !!bodyMeasurements,
      hasSkinData: !!skinTone
    });
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const updatedUser = await User.update(req.user.id, { name });
    
    // Exclude password from response
    delete updatedUser.password;
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;