const db = require('../config/db');

const AttendanceModel = {
  async create(attendanceData) {
    const { class_id, student_id, date, time, status } = attendanceData;
    const [result] = await db.query(
      'INSERT INTO attendance (class_id, student_id, date, time, status) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE status = ?, time = ?',
      [class_id, student_id, date, time, status, status, time]
    );
    return result.insertId;
  },

  async getAll(filters = {}) {
    let query = `
      SELECT a.*, c.class_name, c.class_section, s.student_name, s.roll_number
      FROM attendance a
      JOIN classes c ON a.class_id = c.id
      JOIN students s ON a.student_id = s.id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (filters.class_id) {
      query += ' AND a.class_id = ?';
      params.push(filters.class_id);
    }
    
    if (filters.student_id) {
      query += ' AND a.student_id = ?';
      params.push(filters.student_id);
    }
    
    if (filters.date) {
      query += ' AND a.date = ?';
      params.push(filters.date);
    }
    
    query += ' ORDER BY a.date DESC, a.time DESC';
    
    const [rows] = await db.query(query, params);
    return rows;
  },

  async getByClassAndDate(classId, date) {
    const [rows] = await db.query(`
      SELECT a.*, s.student_name, s.roll_number
      FROM attendance a
      JOIN students s ON a.student_id = s.id
      WHERE a.class_id = ? AND a.date = ?
      ORDER BY s.roll_number
    `, [classId, date]);
    return rows;
  },

  async getStudentAttendance(studentId) {
    const [rows] = await db.query(`
      SELECT a.*, c.class_name, c.class_section
      FROM attendance a
      JOIN classes c ON a.class_id = c.id
      WHERE a.student_id = ?
      ORDER BY a.date DESC
    `, [studentId]);
    return rows;
  },

  async update(id, data) {
    const updates = [];
    const values = [];

    if (data.status !== undefined) {
      updates.push('status = ?');
      values.push(data.status);
    }
    
    if (data.time !== undefined) {
      updates.push('time = ?');
      values.push(data.time);
    }

    if (updates.length === 0) return;

    values.push(id);
    await db.query(`UPDATE attendance SET ${updates.join(', ')} WHERE id = ?`, values);
  },

  async delete(id) {
    await db.query('DELETE FROM attendance WHERE id = ?', [id]);
  },

  async getAttendancePercentage(studentId) {
    const [rows] = await db.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present
      FROM attendance
      WHERE student_id = ?
    `, [studentId]);
    
    const { total, present } = rows[0];
    return total > 0 ? ((present / total) * 100).toFixed(2) : 0;
  }
};

module.exports = AttendanceModel;
