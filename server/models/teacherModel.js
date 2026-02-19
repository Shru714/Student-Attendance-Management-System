const db = require('../config/db');

const TeacherModel = {
  async create(userId, teacherId, contactNo) {
    const [result] = await db.query(
      'INSERT INTO teachers (userId, teacherId, contactNo) VALUES (?, ?, ?)',
      [userId, teacherId, contactNo]
    );
    return result.insertId;
  },

  async findByUserId(userId) {
    const [rows] = await db.query(
      'SELECT * FROM teachers WHERE userId = ?',
      [userId]
    );
    return rows[0];
  },

  async findByTeacherId(teacherId) {
    const [rows] = await db.query(
      'SELECT t.*, u.name, u.email, u.phone, u.address FROM teachers t JOIN users u ON t.userId = u.id WHERE t.teacherId = ?',
      [teacherId]
    );
    return rows[0];
  },

  async findById(id) {
    const [rows] = await db.query(
      'SELECT t.*, u.name, u.email, u.phone, u.address FROM teachers t JOIN users u ON t.userId = u.id WHERE t.id = ?',
      [id]
    );
    return rows[0];
  },

  async getAll() {
    const [rows] = await db.query(
      'SELECT t.*, u.name, u.email, u.phone, u.address FROM teachers t JOIN users u ON t.userId = u.id'
    );
    return rows;
  },

  async update(id, contactNo) {
    await db.query(
      'UPDATE teachers SET contactNo = ? WHERE id = ?',
      [contactNo, id]
    );
  },

  async delete(id) {
    await db.query('DELETE FROM teachers WHERE id = ?', [id]);
  },

  // Subject assignments
  async assignSubjects(teacherId, subjectIds) {
    await db.query('DELETE FROM teacher_subjects WHERE teacherId = ?', [teacherId]);
    if (subjectIds && subjectIds.length > 0) {
      const values = subjectIds.map(subjectId => [teacherId, subjectId]);
      await db.query(
        'INSERT INTO teacher_subjects (teacherId, subjectId) VALUES ?',
        [values]
      );
    }
  },

  async getSubjects(teacherId) {
    const [rows] = await db.query(`
      SELECT s.* FROM subjects s
      JOIN teacher_subjects ts ON s.id = ts.subjectId
      WHERE ts.teacherId = ?
    `, [teacherId]);
    return rows;
  },

  // Year assignments
  async assignYears(teacherId, years) {
    await db.query('DELETE FROM teacher_years WHERE teacherId = ?', [teacherId]);
    if (years && years.length > 0) {
      const values = years.map(year => [teacherId, year]);
      await db.query(
        'INSERT INTO teacher_years (teacherId, year) VALUES ?',
        [values]
      );
    }
  },

  async getYears(teacherId) {
    const [rows] = await db.query(
      'SELECT year FROM teacher_years WHERE teacherId = ? ORDER BY year',
      [teacherId]
    );
    return rows.map(r => r.year);
  },

  // Class assignments
  async assignClasses(teacherId, classIds) {
    await db.query('DELETE FROM teacher_classes WHERE teacherId = ?', [teacherId]);
    if (classIds && classIds.length > 0) {
      const values = classIds.map(classId => [teacherId, classId]);
      await db.query(
        'INSERT INTO teacher_classes (teacherId, classId) VALUES ?',
        [values]
      );
    }
  },

  async getClasses(teacherId) {
    const [rows] = await db.query(`
      SELECT c.* FROM classes c
      JOIN teacher_classes tc ON c.id = tc.classId
      WHERE tc.teacherId = ?
    `, [teacherId]);
    return rows;
  },

  // Get complete teacher profile with all assignments
  async getProfile(teacherId) {
    const teacher = await this.findById(teacherId);
    if (!teacher) return null;

    const subjects = await this.getSubjects(teacherId);
    const years = await this.getYears(teacherId);
    const classes = await this.getClasses(teacherId);

    return {
      ...teacher,
      subjects,
      years,
      classes
    };
  }
};

module.exports = TeacherModel;
