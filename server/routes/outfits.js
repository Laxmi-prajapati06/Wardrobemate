const express = require('express');
const router = express.Router();
const OutfitController = require('../controllers/OutfitController');
const authMiddleware = require('../middleware/auth');

router.get(
  '/recommendations',
  authMiddleware,
  OutfitController.getRecommendations
);

router.post(
  '/save',
  authMiddleware,
  OutfitController.saveRecommendation
);

module.exports = router;