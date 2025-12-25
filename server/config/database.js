const dns = require('dns');
try {
  dns.setDefaultResultOrder('ipv4first');
  console.log('✅ DNS Order set to ipv4first in database.js');
} catch (e) {
  console.error('⚠️ Could not set DNS order:', e.message);
}

const { Pool } = require('pg');
const { DB_CONFIG } = require('./config');

// Validate DB_CONFIG
if (!DB_CONFIG) {
  throw new Error('DB_CONFIG is not defined. Check your config file.');
}

const requiredConfig = ['user', 'host', 'database', 'password', 'port'];
for (const key of requiredConfig) {
  if (!DB_CONFIG[key]) {
    throw new Error(`Missing database config value for ${key}`);
  }
}

// Initialize Pool
const pool = new Pool(DB_CONFIG);

// Connection lifecycle management
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Database already connected');
    return;
  }

  try {
    console.log(`🔌 Attempting to connect to DB at ${DB_CONFIG.host}...`);
    const client = await pool.connect();
    isConnected = true;
    console.log('✅ PostgreSQL connected successfully');
    
    // Test the connection
    await client.query('SELECT NOW()');
    client.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
};

const closeDB = async () => {
  if (!isConnected) return;
  await pool.end();
  isConnected = false;
  console.log('PostgreSQL connection closed');
};

const query = async (text, params) => {
  try {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    // console.log('Query executed in', duration, 'ms'); 
    return res;
  } catch (err) {
    console.error('Query error:', err.message);
    throw err;
  }
};

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