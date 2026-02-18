const db = require('../config/db');

const ClassModel = {
  async create(classData) {
    const { className, class_name, year, class_section, academic_year } = classData;
    
    // Support both className and class_name
    const name = className || class_name;
    
    // Validate required fields
    if (!name) throw new Error('class_name is required');
    if (!year) throw new Error('year is required');
    
    const [result] = await db.query(
      'INSERT INTO classes (class_name, class_section, year, academic_year) VALUES (?, ?, ?, ?)',
      [name, class_section || null, parseInt(year), academic_year || null]
    );
    return result.insertId;
  },

  async getAll() {
    const [rows] = await db.query('SELECT * FROM classes ORDER BY created_at DESC');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM classes WHERE id = ?', [id]);
    return rows[0];
  },

  async update(id, classData) {
    const { className, class_name, year, class_section, academic_year } = classData;
    
    const updateFields = [];
    const updateValues = [];
    
    // Support both className and class_name
    const name = className || class_name;
    
    if (name) {
      updateFields.push('class_name = ?');
      updateValues.push(name);
    }
    if (year) {
      updateFields.push('year = ?');
      updateValues.push(parseInt(year));
    }
    if (class_section !== undefined) {
      updateFields.push('class_section = ?');
      updateValues.push(class_section || null);
    }
    if (academic_year) {
      updateFields.push('academic_year = ?');
      updateValues.push(academic_year);
    }
    
    if (updateFields.length === 0) {
      throw new Error('No fields to update');
    }
    
    updateValues.push(id);
    await db.query(
      `UPDATE classes SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );
  },

  async delete(id) {
    await db.query('DELETE FROM classes WHERE id = ?', [id]);
  },

  async getNextRollNumber(classId) {
    const [rows] = await db.query(
      'SELECT roll_number FROM students WHERE class_id = ? ORDER BY roll_number DESC LIMIT 1',
      [classId]
    );
    
    if (rows.length === 0) {
      const classInfo = await this.findById(classId);
      const className = classInfo.class_name || classInfo.className;
      return `${className.substring(0, 3).toUpperCase()}001`;
    }
    
    const lastRoll = rows[0].roll_number;
    const prefix = lastRoll.replace(/\d+$/, '');
    const number = parseInt(lastRoll.match(/\d+$/)[0]) + 1;
    return `${prefix}${String(number).padStart(3, '0')}`;
  }
};

module.exports = ClassModel;
