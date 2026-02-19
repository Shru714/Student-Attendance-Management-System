const db = require('../config/db');

const markAttendance = async (req, res) => {
  try {
    const { subjectId, date, attendanceData } = req.body;
    const markedBy = req.user.id;

    if (!subjectId || !date || !attendanceData || !Array.isArray(attendanceData)) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    const connection = await db.getConnection();
    
    try {
      await connection.beginTransaction();

      for (const record of attendanceData) {
        const { studentId, status } = record;

        await connection.query(`
          INSERT INTO attendance (student_id, subject_id, date, status, marked_by)
          VALUES (?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE status = ?, marked_by = ?
        `, [studentId, subjectId, date, status, markedBy, status, markedBy]);
      }

      await connection.commit();
      res.json({ message: 'Attendance marked successfully' });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAttendanceByDate = async (req, res) => {
  try {
    const { subjectId, date } = req.query;

    if (!subjectId || !date) {
      return res.status(400).json({ message: 'Subject ID and date are required' });
    }

    const [attendance] = await db.query(`
      SELECT a.attendance_id, a.student_id, s.roll_number, u.name, a.status
      FROM attendance a
      JOIN students s ON a.student_id = s.student_id
      JOIN users u ON s.user_id = u.id
      WHERE a.subject_id = ? AND a.date = ?
      ORDER BY s.roll_number
    `, [subjectId, date]);

    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getStudentAttendance = async (req, res) => {
  try {
    const userId = req.user.id;

    const [student] = await db.query('SELECT student_id FROM students WHERE user_id = ?', [userId]);
    
    if (student.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const studentId = student[0].student_id;

    const [attendance] = await db.query(`
      SELECT 
        s.subject_code,
        s.subject_name,
        COUNT(*) as total_classes,
        SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) as present_count,
        ROUND((SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) as percentage
      FROM attendance a
      JOIN subjects s ON a.subject_id = s.subject_id
      WHERE a.student_id = ?
      GROUP BY s.subject_id, s.subject_code, s.subject_name
    `, [studentId]);

    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAttendanceReport = async (req, res) => {
  try {
    const { subjectId, startDate, endDate } = req.query;

    if (!subjectId) {
      return res.status(400).json({ message: 'Subject ID is required' });
    }

    let query = `
      SELECT 
        s.student_id,
        s.roll_number,
        u.name,
        COUNT(*) as total_classes,
        SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) as present_count,
        SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) as absent_count,
        ROUND((SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) as percentage
      FROM attendance a
      JOIN students s ON a.student_id = s.student_id
      JOIN users u ON s.user_id = u.id
      WHERE a.subject_id = ?
    `;

    const params = [subjectId];

    if (startDate && endDate) {
      query += ' AND a.date BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }

    query += ' GROUP BY s.student_id, s.roll_number, u.name ORDER BY s.roll_number';

    const [report] = await db.query(query, params);
    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { markAttendance, getAttendanceByDate, getStudentAttendance, getAttendanceReport };
