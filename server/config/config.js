// server/config/config.js
require('dotenv').config();

module.exports = {
  DB_CONFIG: {
    user: process.env.DB_USER || 'wardrobemate-user',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'outfitrecommender',
    password: process.env.DB_PASSWORD || '1234', // Fixed: was DB_NAME instead of DB_PASSWORD
    port: process.env.DB_PORT || 5432,
    max: 20,
    idleTimeoutMillis: 30000
  },
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  PORT: process.env.PORT || 5000
};