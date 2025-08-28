const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const outfitRoutes = require('./routes/outfits');
const aiRoutes = require('./routes/ai');

const errorHandler = require('./middleware/error');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/outfits', outfitRoutes);
app.use('/api/ai', aiRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;