const http = require('http');
require('dotenv').config();
const router = require('./routes/router');

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

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 Database: ${process.env.DB_NAME}`);
  console.log(`🔐 JWT Secret configured`);
});
