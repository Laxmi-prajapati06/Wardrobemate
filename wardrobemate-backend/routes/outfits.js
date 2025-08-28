const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getBodyTypeRecommendations,
  getColorRecommendations,
  getOccasionRecommendations
} = require('../controllers/outfits');

/**
 * @route GET /api/outfits/body-type
 * @desc Get outfit recommendations based on user's body type
 * @access Private
 */
router.get('/body-type', protect, getBodyTypeRecommendations);

/**
 * @route GET /api/outfits/colors
 * @desc Get outfit recommendations based on user's color preferences
 * @access Private
 */
router.get('/colors', protect, getColorRecommendations);

/**
 * @route GET /api/outfits/occasion/:occasionId
 * @desc Get outfit recommendations for specific occasion
 * @access Private
 */
router.get('/occasion/:occasionId', protect, getOccasionRecommendations);

module.exports = router;