const db = require('../config/db');

const AttendanceModel = {
  async createAttendance(classId, date) {
    const [result] = await db.query(
      'INSERT INTO attendance (classId, date) VALUES (?, ?)',
      [classId, date]
    );
    return result.insertId;
  },

  async findAttendance(classId, date) {
    const [rows] = await db.query(
      'SELECT * FROM attendance WHERE classId = ? AND date = ?',
      [classId, date]
    );
    return rows[0];
  },

  async createRecord(attendanceId, studentId, status) {
    await db.query(
      'INSERT INTO attendance_records (attendanceId, studentId, status) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE status = ?',
      [attendanceId, studentId, status, status]
    );
  },

  async getRecordsByAttendance(attendanceId) {
    const [rows] = await db.query(`
      SELECT ar.*, s.rollNumber, u.name as studentName
      FROM attendance_records ar
      JOIN students s ON ar.studentId = s.id
      JOIN users u ON s.userId = u.id
      WHERE ar.attendanceId = ?
    `, [attendanceId]);
    return rows;
  },

  async getStudentAttendance(studentId) {
    const [rows] = await db.query(`
      SELECT a.date, ar.status, c.className
      FROM attendance_records ar
      JOIN attendance a ON ar.attendanceId = a.id
      JOIN classes c ON a.classId = c.id
      WHERE ar.studentId = ?
      ORDER BY a.date DESC
    `, [studentId]);
    return rows;
  },

  async getAllAttendance() {
    const [rows] = await db.query(`
      SELECT a.date, c.className, u.name as studentName, s.rollNumber, ar.status
      FROM attendance_records ar
      JOIN attendance a ON ar.attendanceId = a.id
      JOIN students s ON ar.studentId = s.id
      JOIN users u ON s.userId = u.id
      JOIN classes c ON a.classId = c.id
      ORDER BY a.date DESC
    `);
    return rows;
  }
};

module.exports = AttendanceModel;
