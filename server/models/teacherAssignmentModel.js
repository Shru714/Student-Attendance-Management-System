const db = require('../config/db');

const TeacherAssignmentModel = {
  async assign(teacherId, classId, subjectId) {
    const [result] = await db.query(
      'INSERT INTO teacher_assignments (teacher_id, class_id, subject_id) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE id=id',
      [teacherId, classId, subjectId]
    );
    return result.insertId;
  },

  async assignMultiple(teacherId, assignments) {
    const promises = assignments.map(({ classId, subjectId }) =>
      this.assign(teacherId, classId, subjectId)
    );
    await Promise.all(promises);
  },

  async getByTeacherId(teacherId) {
    const [rows] = await db.query(`
      SELECT ta.*, c.class_name, c.year, s.subject_name, s.subject_code
      FROM teacher_assignments ta
      JOIN classes c ON ta.class_id = c.id
      JOIN subjects s ON ta.subject_id = s.id
      WHERE ta.teacher_id = ?
    `, [teacherId]);
    return rows;
  },

  async getByUserId(userId) {
    const [rows] = await db.query(`
      SELECT ta.*, c.class_name, c.year, s.subject_name, s.subject_code
      FROM teacher_assignments ta
      JOIN teachers t ON ta.teacher_id = t.id
      JOIN classes c ON ta.class_id = c.id
      JOIN subjects s ON ta.subject_id = s.id
      WHERE t.user_id = ?
    `, [userId]);
    return rows;
  },

  async removeByTeacherId(teacherId) {
    await db.query('DELETE FROM teacher_assignments WHERE teacher_id = ?', [teacherId]);
  }
};

module.exports = TeacherAssignmentModel;
