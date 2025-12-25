const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const bodyTypeRoutes = require('./routes/bodyType');
const skinToneRoutes = require('./routes/skinTone');
const outfitRoutes = require('./routes/outfits');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*', // Allow your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true
}));

app.options('*', cors());

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check endpoints (ADD THESE)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/api/health/db', async (req, res) => {
  try {
    const { query } = require('./config/database');
    await query('SELECT NOW()');
    res.json({ 
      status: 'OK', 
      message: 'Database connection successful',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Database connection failed',
      error: error.message 
    });
  }
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Outfit Recommender API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout'
      },
      users: {
        getProfile: 'GET /api/users/me',
        updateProfile: 'PUT /api/users/profile'
      },
      bodyType: {
        analyze: 'POST /api/body-type/analyze'
      },
      skinTone: {
        analyze: 'POST /api/skin-tone/analyze'
      },
      outfits: {
        recommendations: 'GET /api/outfits/recommendations',
        save: 'POST /api/outfits/save'
      },
      health: {
        server: 'GET /api/health',
        database: 'GET /api/health/db'
      }
    }
  });
});

// Routes (make sure these are AFTER the health endpoints)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/body-type', bodyTypeRoutes);
app.use('/api/skin-tone', skinToneRoutes);
app.use('/api/outfits', outfitRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;