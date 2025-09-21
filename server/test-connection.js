const { query } = require('./config/database');

async function testConnection() {
  try {
    console.log('Testing database connection with wardrobemate-user...');
    
    // Test simple query
    const result = await query('SELECT NOW() as current_time');
    console.log('✓ Database connection successful:', result.rows[0].current_time);
    
    // Test users table access
    const usersResult = await query('SELECT COUNT(*) FROM users');
    console.log('✓ Users table access successful. Total users:', usersResult.rows[0].count);
    
  } catch (error) {
    console.error('✗ Database test failed:', error.message);
    console.error('Full error:', error);
  }
}

testConnection();