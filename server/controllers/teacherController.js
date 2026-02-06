const db = require('../config/db');

const getAssignedClasses = async (req, res) => {
  try {
    const userId = req.user.id;

    const [teacher] = await db.query('SELECT teacher_id FROM teachers WHERE user_id = ?', [userId]);
    
    if (teacher.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const teacherId = teacher[0].teacher_id;

    const [classes] = await db.query(`
      SELECT c.class_id, c.academic_year, s.subject_id, s.subject_code, s.subject_name, s.course, s.year
      FROM classes c
      JOIN subjects s ON c.subject_id = s.subject_id
      WHERE c.teacher_id = ?
    `, [teacherId]);

    res.json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getStudentsBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const [subject] = await db.query('SELECT course, year FROM subjects WHERE subject_id = ?', [subjectId]);
    
    if (subject.length === 0) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const [students] = await db.query(`
      SELECT s.student_id, s.roll_number, u.name, u.email
      FROM students s
      JOIN users u ON s.user_id = u.id
      WHERE s.course = ? AND s.year = ? AND u.is_active = TRUE
      ORDER BY s.roll_number
    `, [subject[0].course, subject[0].year]);

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const [teacher] = await db.query('SELECT teacher_id FROM teachers WHERE user_id = ?', [userId]);
    
    if (teacher.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const teacherId = teacher[0].teacher_id;
    const today = new Date().toISOString().split('T')[0];

    const [classes] = await db.query('SELECT COUNT(*) as count FROM classes WHERE teacher_id = ?', [teacherId]);
    
    const [todayAttendance] = await db.query(`
      SELECT COUNT(DISTINCT subject_id) as count 
      FROM attendance 
      WHERE marked_by = ? AND date = ?
    `, [userId, today]);

    res.json({
      totalClasses: classes[0].count,
      attendanceMarkedToday: todayAttendance[0].count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAssignedClasses, getStudentsBySubject, getDashboardStats };
