const express = require('express');
const router = express.Router();
const { register, login } = require('../services/auth');
const { validateRegistration, validateLogin } = require('../utils/validators');

router.post('/register', validateRegistration, async (req, res, next) => {
  try {
    const { user, token } = await register(req.body);
    res.cookie('token', token, { httpOnly: true }).status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', validateLogin, async (req, res, next) => {
  try {
    const { user, token } = await login(req.body);
    res.cookie('token', token, { httpOnly: true }).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;