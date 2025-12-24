// 1. ADD THESE TWO LINES AT THE VERY TOP (Crucial for Render/Supabase)
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const { Pool } = require('pg');
const { DB_CONFIG } = require('./config');

// Validate DB_CONFIG before creating the pool
if (!DB_CONFIG) {
  throw new Error('DB_CONFIG is not defined. Check your config file.');
}

const requiredConfig = ['user', 'host', 'database', 'password', 'port'];
for (const key of requiredConfig) {
  if (!DB_CONFIG[key]) {
    throw new Error(`Missing database config value for ${key}`);
  }
}

const pool = new Pool(DB_CONFIG);

// Connection lifecycle management
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Database already connected');
    return;
  }

  try {
    const client = await pool.connect();
    isConnected = true;
    console.log('PostgreSQL connected successfully');
    
    // Test the connection
    await client.query('SELECT NOW()');
    client.release();
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

const closeDB = async () => {
  if (!isConnected) return;
  await pool.end();
  isConnected = false;
  console.log('PostgreSQL connection closed');
};

// Enhanced query method with error handling
const query = async (text, params) => {
  try {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Query executed in', duration, 'ms');
    return res;
  } catch (err) {
    console.error('Query error:', err.message);
    throw err; // Re-throw for route handlers to catch
  }
};

// Cleanup on process termination
process.on('SIGINT', async () => {
  await closeDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeDB();
  process.exit(0);
});

module.exports = {
  connectDB,
  closeDB,
  query,
  getPool: () => pool,
  isConnected: () => isConnected
};