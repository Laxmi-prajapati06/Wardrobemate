const express = require('express');
const router = express.Router();
const BodyTypeController = require('../controllers/BodyTypeController');
const authMiddleware = require('../middleware/auth');

router.post(
  '/analyze',
  authMiddleware,
  BodyTypeController.analyze
);

module.exports = router;