const db = require('../config/db');

const ClassModel = {
  async create(className, year, teacherId = null) {
    const [result] = await db.query(
      'INSERT INTO classes (className, year, teacherId) VALUES (?, ?, ?)',
      [className, year, teacherId]
    );
    return result.insertId;
  },

  async getAll() {
    const [rows] = await db.query(`
      SELECT c.*, u.name as teacherName 
      FROM classes c 
      LEFT JOIN users u ON c.teacherId = u.id
    `);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM classes WHERE id = ?', [id]);
    return rows[0];
  },

  async update(id, className, year, teacherId) {
    await db.query(
      'UPDATE classes SET className = ?, year = ?, teacherId = ? WHERE id = ?',
      [className, year, teacherId, id]
    );
  },

  async delete(id) {
    await db.query('DELETE FROM classes WHERE id = ?', [id]);
  }
};

module.exports = ClassModel;
