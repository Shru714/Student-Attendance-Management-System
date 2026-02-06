const bcrypt = require('bcryptjs');
const db = require('../config/db');

const createUser = async (req, res) => {
  try {
    const { name, email, password, role, additionalInfo } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );

    const userId = result.insertId;

    if (role === 'student') {
      await db.query(
        'INSERT INTO students (user_id, roll_number, course, year) VALUES (?, ?, ?, ?)',
        [userId, additionalInfo.roll_number, additionalInfo.course, additionalInfo.year]
      );
    } else if (role === 'teacher') {
      await db.query(
        'INSERT INTO teachers (user_id, employee_id, department) VALUES (?, ?, ?)',
        [userId, additionalInfo.employee_id, additionalInfo.department]
      );
    }

    res.status(201).json({ message: 'User created successfully', userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const { role } = req.query;
    let query = 'SELECT id, name, email, role, is_active, created_at FROM users';
    const params = [];

    if (role) {
      query += ' WHERE role = ?';
      params.push(role);
    }

    const [users] = await db.query(query, params);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const toggleUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { is_active } = req.body;

    await db.query('UPDATE users SET is_active = ? WHERE id = ?', [is_active, userId]);
    res.json({ message: 'User status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const [students] = await db.query('SELECT COUNT(*) as count FROM students');
    const [teachers] = await db.query('SELECT COUNT(*) as count FROM teachers');
    const [subjects] = await db.query('SELECT COUNT(*) as count FROM subjects');
    const [classes] = await db.query('SELECT COUNT(*) as count FROM classes');

    res.json({
      totalStudents: students[0].count,
      totalTeachers: teachers[0].count,
      totalSubjects: subjects[0].count,
      totalClasses: classes[0].count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createUser, getUsers, toggleUserStatus, getDashboardStats };
