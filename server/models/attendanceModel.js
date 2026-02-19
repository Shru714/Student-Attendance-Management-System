const db = require('../config/db');

const AttendanceModel = {
  async createAttendance(classId, subjectId, date, startTime, endTime) {
    const [result] = await db.query(
      'INSERT INTO attendance (classId, subjectId, date, startTime, endTime) VALUES (?, ?, ?, ?, ?)',
      [classId, subjectId, date, startTime, endTime]
    );
    return result.insertId;
  },

  async findAttendance(classId, subjectId, date) {
    const [rows] = await db.query(
      'SELECT * FROM attendance WHERE classId = ? AND subjectId = ? AND date = ?',
      [classId, subjectId, date]
    );
    return rows[0];
  },

  async lockAttendance(attendanceId) {
    await db.query('UPDATE attendance SET isLocked = TRUE WHERE id = ?', [attendanceId]);
  },

  async isAttendanceLocked(attendanceId) {
    const [rows] = await db.query('SELECT isLocked FROM attendance WHERE id = ?', [attendanceId]);
    return rows[0]?.isLocked || false;
  },

  async autoLockExpiredAttendance() {
    const [settings] = await db.query('SELECT autoLockAfterMinutes FROM attendance_settings LIMIT 1');
    const minutes = settings[0]?.autoLockAfterMinutes || 30;
    
    await db.query(`
      UPDATE attendance 
      SET isLocked = TRUE 
      WHERE isLocked = FALSE 
      AND TIMESTAMPADD(MINUTE, ?, CONCAT(date, ' ', endTime)) < NOW()
    `, [minutes]);
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
      SELECT a.date, ar.status, c.className, sub.subjectName
      FROM attendance_records ar
      JOIN attendance a ON ar.attendanceId = a.id
      JOIN classes c ON a.classId = c.id
      JOIN subjects sub ON a.subjectId = sub.id
      WHERE ar.studentId = ?
      ORDER BY a.date DESC
    `, [studentId]);
    return rows;
  },

  async getAllAttendance(filters = {}) {
    let query = `
      SELECT a.date, c.className, sub.subjectName, u.name as studentName, s.rollNumber, ar.status
      FROM attendance_records ar
      JOIN attendance a ON ar.attendanceId = a.id
      JOIN students s ON ar.studentId = s.id
      JOIN users u ON s.userId = u.id
      JOIN classes c ON a.classId = c.id
      JOIN subjects sub ON a.subjectId = sub.id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (filters.studentId) {
      query += ' AND ar.studentId = ?';
      params.push(filters.studentId);
    }
    
    if (filters.date) {
      query += ' AND a.date = ?';
      params.push(filters.date);
    }
    
    if (filters.subjectId) {
      query += ' AND a.subjectId = ?';
      params.push(filters.subjectId);
    }
    
    query += ' ORDER BY a.date DESC';
    
    const [rows] = await db.query(query, params);
    return rows;
  },

  async checkLowAttendance() {
    const [settings] = await db.query('SELECT lowAttendanceThreshold FROM attendance_settings LIMIT 1');
    const threshold = settings[0]?.lowAttendanceThreshold || 50;
    
    const [students] = await db.query(`
      SELECT 
        s.id as studentId,
        s.userId,
        u.name,
        COUNT(*) as total,
        SUM(CASE WHEN ar.status = 'Present' THEN 1 ELSE 0 END) as present,
        (SUM(CASE WHEN ar.status = 'Present' THEN 1 ELSE 0 END) / COUNT(*) * 100) as percentage
      FROM students s
      JOIN users u ON s.userId = u.id
      JOIN attendance_records ar ON s.id = ar.studentId
      GROUP BY s.id, s.userId, u.name
      HAVING percentage < ?
    `, [threshold]);
    
    return students;
  }
};

module.exports = AttendanceModel;
