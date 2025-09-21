const User = require('../models/User');
const { generateToken } = require('../services/authService');
const { hashPassword, comparePasswords } = require('../utils/passwordUtils');

class AuthController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      
      // Check if user exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user
      const user = await User.create({ name, email, password: hashedPassword });
      
      // Generate token
      const token = generateToken(user.id);
      
      // Remove password from response
      delete user.password;
      
      res.status(201).json({ user, token });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      
      // Find user
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check password
      const isValid = await comparePasswords(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate token
      const token = generateToken(user.id);
      
      // Remove password from response
      delete user.password;
      
      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res) {
    // In a real app, you'd handle token invalidation here
    res.json({ message: 'Logged out successfully' });
  }
}

module.exports = AuthController;