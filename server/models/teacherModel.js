const db = require('../config/db');

const TeacherModel = {
  async create(teacherData) {
    console.log('TeacherModel.create called with:', teacherData);
    const { user_id, teacher_id, contact_no } = teacherData;
    console.log('Extracted values:', { user_id, teacher_id, contact_no });
    
    const query = 'INSERT INTO teachers (user_id, teacher_id, contact_no) VALUES (?, ?, ?)';
    const values = [user_id, teacher_id, contact_no];
    console.log('Executing query:', query);
    console.log('With values:', values);
    
    const [result] = await db.query(query, values);
    console.log('Insert successful, insertId:', result.insertId);
    return result.insertId;
  },

  async findByUserId(userId) {
    const [rows] = await db.query(
      'SELECT * FROM teachers WHERE user_id = ?',
      [userId]
    );
    return rows[0];
  },

  async findByTeacherId(teacherId) {
    const [rows] = await db.query(`
      SELECT t.*, u.name, u.email 
      FROM teachers t 
      JOIN users u ON t.user_id = u.id 
      WHERE t.teacher_id = ?
    `, [teacherId]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await db.query(`
      SELECT t.*, u.name, u.email 
      FROM teachers t 
      JOIN users u ON t.user_id = u.id 
      WHERE t.id = ?
    `, [id]);
    return rows[0];
  },

  async getAll() {
    const [rows] = await db.query(`
      SELECT t.*, u.name, u.email 
      FROM teachers t 
      JOIN users u ON t.user_id = u.id
      ORDER BY t.created_at DESC
    `);
    return rows;
  },

  async update(id, data) {
    const { contact_no } = data;
    
    const updateFields = [];
    const updateValues = [];
    
    if (contact_no !== undefined) {
      updateFields.push('contact_no = ?');
      updateValues.push(contact_no);
    }
    
    if (updateFields.length === 0) {
      throw new Error('No fields to update');
    }
    
    updateValues.push(id);
    await db.query(
      `UPDATE teachers SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );
  },

  async delete(id) {
    await db.query('DELETE FROM teachers WHERE id = ?', [id]);
  },

  // Subject assignments
  async assignSubjects(teacherId, subjectIds) {
    await db.query('DELETE FROM teacher_subjects WHERE teacher_id = ?', [teacherId]);
    if (subjectIds && subjectIds.length > 0) {
      const values = subjectIds.map(subjectId => [teacherId, subjectId]);
      await db.query(
        'INSERT INTO teacher_subjects (teacher_id, subject_id) VALUES ?',
        [values]
      );
    }
  },

  async getSubjects(teacherId) {
    const [rows] = await db.query(`
      SELECT s.* FROM subjects s
      JOIN teacher_subjects ts ON s.id = ts.subject_id
      WHERE ts.teacher_id = ?
    `, [teacherId]);
    return rows;
  },

  // Year assignments
  async assignYears(teacherId, years) {
    await db.query('DELETE FROM teacher_years WHERE teacher_id = ?', [teacherId]);
    if (years && years.length > 0) {
      const values = years.map(year => [teacherId, year]);
      await db.query(
        'INSERT INTO teacher_years (teacher_id, year) VALUES ?',
        [values]
      );
    }
  },

  async getYears(teacherId) {
    const [rows] = await db.query(
      'SELECT year FROM teacher_years WHERE teacher_id = ? ORDER BY year',
      [teacherId]
    );
    return rows.map(r => r.year);
  },

  // Class assignments
  async assignClasses(teacherId, classIds) {
    await db.query('DELETE FROM teacher_classes WHERE teacher_id = ?', [teacherId]);
    if (classIds && classIds.length > 0) {
      const values = classIds.map(classId => [teacherId, classId]);
      await db.query(
        'INSERT INTO teacher_classes (teacher_id, class_id) VALUES ?',
        [values]
      );
    }
  },

  async getClasses(teacherId) {
    const [rows] = await db.query(`
      SELECT c.* FROM classes c
      JOIN teacher_classes tc ON c.id = tc.class_id
      WHERE tc.teacher_id = ?
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
