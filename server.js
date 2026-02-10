const http = require('http');
require('dotenv').config();
const router = require('./routes/router');
const db = require('./config/db');

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Set JSON response header
  res.setHeader('Content-Type', 'application/json');

  try {
    const result = await router(req, res);
    res.writeHead(result.status);
    res.end(JSON.stringify(result.data));
  } catch (error) {
    console.error('Server Error:', error);
    res.writeHead(500);
    res.end(JSON.stringify({ message: 'Internal server error' }));
  }
});

server.listen(PORT, async () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`${'='.repeat(50)}\n`);
  
  // Test database connection
  try {
    console.log('📊 Testing database connection...');
    const [result] = await db.query('SELECT 1 + 1 AS result');
    const [dbName] = await db.query('SELECT DATABASE() as db_name');
    const [tables] = await db.query('SHOW TABLES FROM attendance_system');
    
    console.log('✅ Database connected successfully!');
    console.log(`   Database: ${dbName[0].db_name || process.env.DB_NAME}`);
    console.log(`   Host: ${process.env.DB_HOST}`);
    console.log(`   User: ${process.env.DB_USER}`);
    console.log(`   Tables: ${tables.length} tables found`);
    
    // Check for data
    const [userCount] = await db.query('SELECT COUNT(*) as count FROM users');
    const [teacherCount] = await db.query('SELECT COUNT(*) as count FROM teachers');
    const [studentCount] = await db.query('SELECT COUNT(*) as count FROM students');
    
    console.log(`\n📈 Current Data:`);
    console.log(`   Users: ${userCount[0].count}`);
    console.log(`   Teachers: ${teacherCount[0].count}`);
    console.log(`   Students: ${studentCount[0].count}`);
    
    console.log(`\n${'='.repeat(50)}`);
    console.log('✅ Server ready to accept requests');
    console.log(`${'='.repeat(50)}\n`);
    
  } catch (error) {
    console.error('\n❌ DATABASE CONNECTION FAILED!');
    console.error('Error:', error.message);
    console.error('\n⚠️  Server is running but database is NOT connected!');
    console.error('\nPlease check:');
    console.error('1. MySQL is running (XAMPP/WAMP)');
    console.error('2. .env file has correct credentials');
    console.error('3. Database "attendance_system" exists');
    console.error(`\nCurrent config:`);
    console.error(`   DB_HOST: ${process.env.DB_HOST}`);
    console.error(`   DB_USER: ${process.env.DB_USER}`);
    console.error(`   DB_NAME: ${process.env.DB_NAME}`);
    console.error(`\n${'='.repeat(50)}\n`);
  }
});
