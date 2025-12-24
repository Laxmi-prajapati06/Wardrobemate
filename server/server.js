const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const app = require('./app');
const { PORT } = require('./config/config'); 
const { connectDB } = require('./config/database');

// Connect to database
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});