const db = require('../config/db');

const UserModel = {
  async create(name, email, hashedPassword, role) {
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );
    return result.insertId;
  },

  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  async getAll() {
    const [rows] = await db.query('SELECT id, name, email, role, created_at FROM users');
    return rows;
  }
};

module.exports = UserModel;
