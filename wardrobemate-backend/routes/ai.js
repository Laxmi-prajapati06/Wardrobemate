const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  generateOutfitRecommendation,
  getPastRecommendations,
  saveOutfit,
  deleteRecommendation
} = require('../controllers/ai');

/**
 * @route POST /api/ai/generate
 * @desc Generate new AI-powered outfit recommendation
 * @access Private
 */
router.post('/generate', protect, generateOutfitRecommendation);

/**
 * @route GET /api/ai/history
 * @desc Get user's past AI recommendations
 * @access Private
 */
router.get('/history', protect, getPastRecommendations);

/**
 * @route POST /api/ai/save/:recommendationId
 * @desc Save an AI recommendation to user's favorites
 * @access Private
 */
router.post('/save/:recommendationId', protect, saveOutfit);

/**
 * @route DELETE /api/ai/:recommendationId
 * @desc Delete a saved recommendation
 * @access Private
 */
router.delete('/:recommendationId', protect, deleteRecommendation);

module.exports = router;