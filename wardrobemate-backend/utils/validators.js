// eslint-disable-next-line no-unused-vars
const validator = require('validator');
const { body } = require('express-validator');

const validateRegistration = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain a number')
];

const validateLogin = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required')
];

const validateMeasurements = [
  body('bust').isNumeric().withMessage('Bust must be a number'),
  body('waist').isNumeric().withMessage('Waist must be a number'),
  body('hips').isNumeric().withMessage('Hips must be a number'),
  body('height').isNumeric().withMessage('Height must be a number')
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateMeasurements
};