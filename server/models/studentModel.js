const db = require('../config/db');

const StudentModel = {
  async create(userId, classId, rollNumber, parentPhone) {
    const [result] = await db.query(
      'INSERT INTO students (userId, classId, rollNumber, parentPhone) VALUES (?, ?, ?, ?)',
      [userId, classId, rollNumber, parentPhone]
    );
    return result.insertId;
  },

  async getAll() {
    const [rows] = await db.query(`
      SELECT s.*, u.name, u.email, u.phone, u.address, c.className 
      FROM students s
      JOIN users u ON s.userId = u.id
      JOIN classes c ON s.classId = c.id
    `);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query(`
      SELECT s.*, u.name, u.email, u.phone, u.address, c.className 
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

  async findByRollNumber(rollNumber) {
    const [rows] = await db.query(`
      SELECT s.*, c.className 
      FROM students s
      JOIN classes c ON s.classId = c.id
      WHERE s.rollNumber = ?
    `, [rollNumber]);
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

  async update(id, data) {
    const { rollNumber, parentPhone } = data;
    await db.query(
      'UPDATE students SET rollNumber = ?, parentPhone = ? WHERE id = ?',
      [rollNumber, parentPhone, id]
    );
  },

  async delete(id) {
    await db.query('DELETE FROM students WHERE id = ?', [id]);
  },

  async getAttendancePercentage(studentId) {
    const [rows] = await db.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) as present
      FROM attendance_records
      WHERE studentId = ?
    `, [studentId]);
    
    const { total, present } = rows[0];
    return total > 0 ? ((present / total) * 100).toFixed(2) : 0;
  }
};

module.exports = StudentModel;
