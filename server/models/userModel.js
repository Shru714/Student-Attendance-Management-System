const db = require('../config/db');

const UserModel = {
  async create(name, email, hashedPassword, role, phone = null, address = null) {
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role, phone, address) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role, phone, address]
    );
    return result.insertId;
  },

  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await db.query('SELECT id, name, email, role, phone, address FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  async getAll() {
    const [rows] = await db.query('SELECT id, name, email, role, phone, address, created_at FROM users');
    return rows;
  },

  async updatePassword(userId, hashedPassword) {
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);
  }
};

module.exports = UserModel;
