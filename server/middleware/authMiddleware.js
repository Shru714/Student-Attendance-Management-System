const jwt = require('jsonwebtoken');

const authenticate = (req) => {
  return new Promise((resolve, reject) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return reject({ status: 401, message: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return reject({ status: 403, message: 'Invalid or expired token' });
      }
      resolve(user);
    });
  });
};

const authorize = (roles) => {
  return async (req) => {
    try {
      const user = await authenticate(req);
      if (!roles.includes(user.role)) {
        throw { status: 403, message: 'Access denied' };
      }
      return user;
    } catch (error) {
      throw error;
    }
  };
};

module.exports = { authenticate, authorize };
