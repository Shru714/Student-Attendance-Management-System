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

  async update(id, data) {
    const { subjectName, subjectCode } = data;
    const updates = [];
    const values = [];

    if (subjectName !== undefined) {
      updates.push('subjectName = ?');
      values.push(subjectName);
    }
    if (subjectCode !== undefined) {
      updates.push('subjectCode = ?');
      values.push(subjectCode);
    }

    if (updates.length === 0) return;

    values.push(id);
    await db.query(`UPDATE subjects SET ${updates.join(', ')} WHERE id = ?`, values);
  },

  async delete(id) {
    await db.query('DELETE FROM subjects WHERE id = ?', [id]);
  }
};

module.exports = SubjectModel;
