const db = require('../config/db');

const ClassModel = {
  async create(className, year) {
    const [result] = await db.query(
      'INSERT INTO classes (className, year) VALUES (?, ?)',
      [className, year]
    );
    return result.insertId;
  },

  async getAll() {
    const [rows] = await db.query('SELECT * FROM classes');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM classes WHERE id = ?', [id]);
    return rows[0];
  },

  async update(id, className, year) {
    await db.query(
      'UPDATE classes SET className = ?, year = ? WHERE id = ?',
      [className, year, id]
    );
  },

  async delete(id) {
    await db.query('DELETE FROM classes WHERE id = ?', [id]);
  },

  async getNextRollNumber(classId) {
    const [rows] = await db.query(
      'SELECT rollNumber FROM students WHERE classId = ? ORDER BY rollNumber DESC LIMIT 1',
      [classId]
    );
    
    if (rows.length === 0) {
      const classInfo = await this.findById(classId);
      return `${classInfo.className.substring(0, 3).toUpperCase()}001`;
    }
    
    const lastRoll = rows[0].rollNumber;
    const prefix = lastRoll.replace(/\d+$/, '');
    const number = parseInt(lastRoll.match(/\d+$/)[0]) + 1;
    return `${prefix}${String(number).padStart(3, '0')}`;
  }
};

module.exports = ClassModel;
