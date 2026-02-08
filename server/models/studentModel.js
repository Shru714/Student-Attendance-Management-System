const db = require('../config/db');

const StudentModel = {
  async create(userId, classId, rollNumber) {
    const [result] = await db.query(
      'INSERT INTO students (userId, classId, rollNumber) VALUES (?, ?, ?)',
      [userId, classId, rollNumber]
    );
    return result.insertId;
  },

  async getAll() {
    const [rows] = await db.query(`
      SELECT s.*, u.name, u.email, c.className 
      FROM students s
      JOIN users u ON s.userId = u.id
      JOIN classes c ON s.classId = c.id
    `);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query(`
      SELECT s.*, u.name, u.email, c.className 
      FROM students s
      JOIN users u ON s.userId = u.id
      JOIN classes c ON s.classId = c.id
      WHERE s.id = ?
    `, [id]);
    return rows[0];
  },

  async findByUserId(userId) {
    const [rows] = await db.query(`
      SELECT s.*, c.className 
      FROM students s
      JOIN classes c ON s.classId = c.id
      WHERE s.userId = ?
    `, [userId]);
    return rows[0];
  },

  async getByClassId(classId) {
    const [rows] = await db.query(`
      SELECT s.*, u.name 
      FROM students s
      JOIN users u ON s.userId = u.id
      WHERE s.classId = ?
    `, [classId]);
    return rows;
  },

  async delete(id) {
    await db.query('DELETE FROM students WHERE id = ?', [id]);
  }
};

module.exports = StudentModel;
