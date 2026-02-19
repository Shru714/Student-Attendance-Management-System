const db = require('../config/db');

const TeacherAssignmentModel = {
  async assign(teacherId, classId, subjectId) {
    const [result] = await db.query(
      'INSERT INTO teacher_assignments (teacherId, classId, subjectId) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE id=id',
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
      SELECT ta.*, c.className, c.year, s.subjectName, s.subjectCode
      FROM teacher_assignments ta
      JOIN classes c ON ta.classId = c.id
      JOIN subjects s ON ta.subjectId = s.id
      WHERE ta.teacherId = ?
    `, [teacherId]);
    return rows;
  },

  async getByUserId(userId) {
    const [rows] = await db.query(`
      SELECT ta.*, c.className, c.year, s.subjectName, s.subjectCode
      FROM teacher_assignments ta
      JOIN teachers t ON ta.teacherId = t.id
      JOIN classes c ON ta.classId = c.id
      JOIN subjects s ON ta.subjectId = s.id
      WHERE t.userId = ?
    `, [userId]);
    return rows;
  },

  async removeByTeacherId(teacherId) {
    await db.query('DELETE FROM teacher_assignments WHERE teacherId = ?', [teacherId]);
  }
};

module.exports = TeacherAssignmentModel;
