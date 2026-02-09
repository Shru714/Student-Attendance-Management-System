/**
 * Test Data Setup Script
 * Run this after setting up the database to populate test data
 * Usage: node setup-test-data.js
 */

const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupTestData() {
  let connection;
  
  try {
    // Connect to database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('✅ Connected to database');

    // 1. Create Admin User
    const adminPassword = await bcrypt.hash('admin123', 10);
    await connection.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=name',
      ['Admin User', 'admin@example.com', adminPassword, 'admin']
    );
    console.log('✅ Admin user created (email: admin@example.com, password: admin123)');

    // 2. Create Subjects
    const subjects = [
      ['Mathematics', 'MATH101'],
      ['Physics', 'PHY101'],
      ['Chemistry', 'CHEM101'],
      ['Computer Science', 'CS101'],
      ['English', 'ENG101']
    ];

    for (const [name, code] of subjects) {
      await connection.query(
        'INSERT INTO subjects (subjectName, subjectCode) VALUES (?, ?) ON DUPLICATE KEY UPDATE subjectName=subjectName',
        [name, code]
      );
    }
    console.log('✅ Subjects created');

    // 3. Create Classes
    const classes = [
      ['BCA 1st Year', 1],
      ['BCA 2nd Year', 2],
      ['BCA 3rd Year', 3],
      ['MCA 1st Year', 1],
      ['MCA 2nd Year', 2]
    ];

    for (const [className, year] of classes) {
      await connection.query(
        'INSERT INTO classes (className, year) VALUES (?, ?) ON DUPLICATE KEY UPDATE className=className',
        [className, year]
      );
    }
    console.log('✅ Classes created');

    // 4. Create Teachers
    const teachers = [
      ['Dr. Rajesh Kumar', 'rajesh@example.com', '9876543210'],
      ['Prof. Priya Sharma', 'priya@example.com', '9876543211'],
      ['Dr. Amit Patel', 'amit@example.com', '9876543212']
    ];

    for (const [name, email, phone] of teachers) {
      const password = await bcrypt.hash('teacher123', 10);
      const [result] = await connection.query(
        'INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=name',
        [name, email, password, 'teacher', phone]
      );
      
      // Assign subjects and classes to teachers
      if (result.insertId) {
        const teacherId = result.insertId;
        // Assign 2 subjects and 2 classes to each teacher
        await connection.query(
          'INSERT INTO teacher_assignments (teacherId, classId, subjectId) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?) ON DUPLICATE KEY UPDATE teacherId=teacherId',
          [teacherId, 1, 1, teacherId, 1, 2, teacherId, 2, 1, teacherId, 2, 2]
        );
      }
    }
    console.log('✅ Teachers created (password: teacher123)');

    // 5. Create Students with auto roll numbers
    const studentData = [
      ['Rahul Verma', 'rahul@example.com', 1, '123 Main St', '9111111111', '9222222222'],
      ['Anita Singh', 'anita@example.com', 1, '456 Park Ave', '9111111112', '9222222223'],
      ['Vikram Joshi', 'vikram@example.com', 1, '789 Lake Rd', '9111111113', '9222222224'],
      ['Sneha Gupta', 'sneha@example.com', 2, '321 Hill St', '9111111114', '9222222225'],
      ['Arjun Reddy', 'arjun@example.com', 2, '654 Valley Dr', '9111111115', '9222222226']
    ];

    let rollCounter = 1;
    for (const [name, email, classId, address, studentContact, parentContact] of studentData) {
      const password = await bcrypt.hash('student123', 10);
      const [userResult] = await connection.query(
        'INSERT INTO users (name, email, password, role, phone, address) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=name',
        [name, email, password, 'student', studentContact, address]
      );
      
      if (userResult.insertId) {
        const userId = userResult.insertId;
        const rollNumber = `BCA25${String(rollCounter).padStart(3, '0')}`;
        await connection.query(
          'INSERT INTO students (userId, classId, rollNumber, parentPhone) VALUES (?, ?, ?, ?)',
          [userId, classId, rollNumber, parentContact]
        );
        rollCounter++;
      }
    }
    console.log('✅ Students created (password: student123)');

    // 6. Create sample attendance records
    const today = new Date().toISOString().split('T')[0];
    const [attendanceResult] = await connection.query(
      'INSERT INTO attendance (classId, subjectId, date, startTime, endTime) VALUES (?, ?, ?, ?, ?)',
      [1, 1, today, '09:00:00', '10:00:00']
    );

    const attendanceId = attendanceResult.insertId;
    const [students] = await connection.query('SELECT id FROM students WHERE classId = 1');
    
    for (const student of students) {
      const status = Math.random() > 0.3 ? 'Present' : 'Absent';
      await connection.query(
        'INSERT INTO attendance_records (attendanceId, studentId, status) VALUES (?, ?, ?)',
        [attendanceId, student.id, status]
      );
    }
    console.log('✅ Sample attendance records created');

    // 7. Create sample notifications
    const [allUsers] = await connection.query('SELECT id, role FROM users WHERE role != "admin"');
    for (const user of allUsers) {
      const message = user.role === 'teacher' 
        ? 'You have been assigned subjects and classes for the academic year 2025-2026.'
        : 'Your account has been created. Please login and change your password.';
      
      await connection.query(
        'INSERT INTO notifications (userId, message, type) VALUES (?, ?, ?)',
        [user.id, message, 'info']
      );
    }
    console.log('✅ Sample notifications created');

    console.log('\n🎉 Test data setup completed successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('Admin: admin@example.com / admin123');
    console.log('Teacher: rajesh@example.com / teacher123');
    console.log('Student: rahul@example.com / student123');
    console.log('\n🚀 Start the server: npm start');

  } catch (error) {
    console.error('❌ Error setting up test data:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupTestData();
