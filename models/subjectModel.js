const db = require('../config/db');

const SubjectModel = {
  async create(subjectName, subjectCode) {
    const [result] = await db.query(
      'INSERT INTO subjects (subjectName, subjectCode) VALUES (?, ?)',
      [subjectName, subjectCode]
    );
    return result.insertId;
  },

  async getAll() {
    const [rows] = await db.query('SELECT * FROM subjects');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM subjects WHERE id = ?', [id]);
    return rows[0];
  },

  async delete(id) {
    await db.query('DELETE FROM subjects WHERE id = ?', [id]);
  }
};

module.exports = SubjectModel;
