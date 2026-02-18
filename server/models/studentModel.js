const db = require('../config/db');

const StudentModel = {
  async create(studentData) {
    const { student_name, email, roll_number, class_id, address, student_contact, parent_contact, password, class_time } = studentData;
    
    try {
      // Try to insert with class_time
      const finalClassTime = class_time || '09:00:00';
      const [result] = await db.query(
        'INSERT INTO students (student_name, email, roll_number, class_id, address, student_contact, parent_contact, password, class_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [student_name, email, roll_number, class_id, address, student_contact, parent_contact, password, finalClassTime]
      );
      return result.insertId;
    } catch (error) {
      // If class_time column doesn't exist, insert without it
      if (error.code === 'ER_BAD_FIELD_ERROR' && error.message.includes('class_time')) {
        console.warn('class_time column not found, inserting without it');
        const [result] = await db.query(
          'INSERT INTO students (student_name, email, roll_number, class_id, address, student_contact, parent_contact, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [student_name, email, roll_number, class_id, address, student_contact, parent_contact, password]
        );
        return result.insertId;
      }
      throw error;
    }
  },

  async getAll() {
    const [rows] = await db.query(`
      SELECT s.*, c.class_name, c.class_section, c.year
      FROM students s
      LEFT JOIN classes c ON s.class_id = c.id
      ORDER BY s.created_at DESC
    `);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query(`
      SELECT s.*, c.class_name, c.class_section, c.year
      FROM students s
      LEFT JOIN classes c ON s.class_id = c.id
      WHERE s.id = ?
    `, [id]);
    return rows[0];
  },

  async findByUserId(userId) {
    const [rows] = await db.query(`
      SELECT s.*, c.class_name, c.class_section, c.year
      FROM students s
      LEFT JOIN classes c ON s.class_id = c.id
      WHERE s.user_id = ?
    `, [userId]);
    return rows[0];
  },

  async findByRollNumber(rollNumber) {
    const [rows] = await db.query(`
      SELECT s.*, c.class_name, c.class_section, c.year
      FROM students s
      LEFT JOIN classes c ON s.class_id = c.id
      WHERE s.roll_number = ?
    `, [rollNumber]);
    return rows[0];
  },

  async getByClassId(classId) {
    const [rows] = await db.query(`
      SELECT s.*
      FROM students s
      WHERE s.class_id = ?
      ORDER BY s.roll_number
    `, [classId]);
    return rows;
  },

  async update(id, data) {
    const { student_name, email, roll_number, class_id, address, student_contact, parent_contact, password, class_time } = data;
    
    const updateFields = [];
    const updateValues = [];
    
    if (student_name) {
      updateFields.push('student_name = ?');
      updateValues.push(student_name);
    }
    if (email !== undefined) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }
    if (roll_number) {
      updateFields.push('roll_number = ?');
      updateValues.push(roll_number);
    }
    if (class_id) {
      updateFields.push('class_id = ?');
      updateValues.push(class_id);
    }
    if (address !== undefined) {
      updateFields.push('address = ?');
      updateValues.push(address);
    }
    if (student_contact !== undefined) {
      updateFields.push('student_contact = ?');
      updateValues.push(student_contact);
    }
    if (parent_contact !== undefined) {
      updateFields.push('parent_contact = ?');
      updateValues.push(parent_contact);
    }
    if (password) {
      updateFields.push('password = ?');
      updateValues.push(password);
    }
    // Only add class_time if column exists (check by trying to update)
    if (class_time !== undefined) {
      try {
        // Check if column exists
        await db.query('SELECT class_time FROM students LIMIT 1');
        updateFields.push('class_time = ?');
        updateValues.push(class_time);
      } catch (error) {
        // Column doesn't exist, skip it
        console.warn('class_time column not found, skipping');
      }
    }
    
    if (updateFields.length === 0) {
      throw new Error('No fields to update');
    }
    
    updateValues.push(id);
    await db.query(
      `UPDATE students SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );
  },

  async delete(id) {
    await db.query('DELETE FROM students WHERE id = ?', [id]);
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

module.exports = StudentModel;
