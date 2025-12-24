const express = require('express');
const router = express.Router();
const OutfitController = require('../controllers/OutfitController');
const authMiddleware = require('../middleware/auth');

router.get(
  '/recommendations',
  authMiddleware,
  OutfitController.getRecommendations
);

router.get(
  '/saved',
  authMiddleware,
  OutfitController.getSavedRecommendations
);

router.post(
  '/save',
  authMiddleware,
  OutfitController.saveRecommendation
);

// NEW ROUTE: Delete a saved outfit
router.delete(
  '/saved/:outfitId',
  authMiddleware,
  OutfitController.removeSavedRecommendation
);

module.exports = router;