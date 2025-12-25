const dns = require('dns');
try {
  dns.setDefaultResultOrder('ipv4first');
} catch (error) {
  console.error('Failed to set DNS order:', error);
}

require('dotenv').config();

const app = require('./app');
const { connectDB } = require('./config/database');

const PORT = process.env.PORT || 5000;
connectDB();

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📡 Accepting requests from: ${process.env.CLIENT_URL || 'All Origins'}`);
});

server.on('error', (err) => {
  console.error('❌ Server failed to start:', err.message);
});