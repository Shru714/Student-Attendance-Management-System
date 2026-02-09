const ClassModel = require('../models/classModel');
const UserModel = require('../models/userModel');
const StudentModel = require('../models/studentModel');
const AttendanceModel = require('../models/attendanceModel');
const SubjectModel = require('../models/subjectModel');
const TeacherAssignmentModel = require('../models/teacherAssignmentModel');
const NotificationModel = require('../models/notificationModel');
const bcrypt = require('bcryptjs');

const AdminController = {
  // Auto generate academic year
  getAcademicYear() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 0-indexed
    
    if (currentMonth >= 6) {
      return `${currentYear}-${currentYear + 1}`;
    } else {
      return `${currentYear - 1}-${currentYear}`;
    }
  },

  // Classes
  async getClasses() {
    return await ClassModel.getAll();
  },

  async createClass(data) {
    const { className, year } = data;
    const academicYear = this.getAcademicYear();
    const id = await ClassModel.create(className, year || academicYear);
    return { message: 'Class created successfully', id, academicYear };
  },

  async updateClass(data) {
    const { id, className, year } = data;
    await ClassModel.update(id, className, year);
    return { message: 'Class updated successfully' };
  },

  async deleteClass(id) {
    await ClassModel.delete(id);
    return { message: 'Class deleted successfully' };
  },

  // Subjects
  async getSubjects() {
    return await SubjectModel.getAll();
  },

  async createSubject(data) {
    const { subjectName, subjectCode } = data;
    const id = await SubjectModel.create(subjectName, subjectCode);
    return { message: 'Subject created successfully', id };
  },

  // Teachers with multi-assignment
  async getTeachers() {
    const users = await UserModel.getAll();
    const teachers = users.filter(u => u.role === 'teacher');
    
    // Get assignments for each teacher
    for (let teacher of teachers) {
      teacher.assignments = await TeacherAssignmentModel.getByTeacherId(teacher.id);
    }
    
    return teachers;
  },

  async createTeacher(data) {
    const { name, email, password, phone, subjects, classes, isClassTeacher } = data;
    const hashedPassword = await bcrypt.hash(password || 'teacher123', 10);
    const userId = await UserModel.create(name, email, hashedPassword, 'teacher', phone);
    
    // Assign multiple subjects and classes
    if (subjects && classes && subjects.length > 0 && classes.length > 0) {
      const assignments = [];
      for (let subjectId of subjects) {
        for (let classId of classes) {
          assignments.push({ classId, subjectId });
        }
      }
      await TeacherAssignmentModel.assignMultiple(userId, assignments);
    }
    
    // Send notification
    const academicYear = this.getAcademicYear();
    await NotificationModel.create(
      userId,
      `You have been assigned subjects and classes for the academic year ${academicYear}.`,
      'info'
    );
    
    return { message: 'Teacher created successfully', userId };
  },

  // Students with auto roll number and bulk creation
  async getStudents() {
    return await StudentModel.getAll();
  },

  async createStudent(data) {
    const { name, email, address, studentContact, parentContact, classId } = data;
    
    // Auto generate roll number
    const rollNumber = await ClassModel.getNextRollNumber(classId);
    
    // Generate random password
    const randomPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    
    const userId = await UserModel.create(name, email, hashedPassword, 'student', studentContact, address);
    const studentId = await StudentModel.create(userId, classId, rollNumber, parentContact);
    
    // Send notification
    await NotificationModel.create(
      userId,
      `Your account has been created. Roll Number: ${rollNumber}. Password: ${randomPassword}. Please login and change your password.`,
      'info'
    );
    
    return { 
      message: 'Student created successfully', 
      studentId, 
      rollNumber,
      password: randomPassword 
    };
  },

  async bulkCreateStudents(data) {
    const { students } = data;
    const results = [];
    
    for (let student of students) {
      try {
        const result = await this.createStudent(student);
        results.push({ success: true, ...result });
      } catch (error) {
        results.push({ success: false, error: error.message, student });
      }
    }
    
    return { message: 'Bulk creation completed', results };
  },

  async updateStudentPassword(data) {
    const { studentId, newPassword } = data;
    const student = await StudentModel.findById(studentId);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.updatePassword(student.userId, hashedPassword);
    
    await NotificationModel.create(
      student.userId,
      'Your password has been updated successfully.',
      'info'
    );
    
    return { message: 'Password updated successfully' };
  },

  async deleteStudent(id) {
    await StudentModel.delete(id);
    return { message: 'Student deleted successfully' };
  },

  // Attendance Reports with filters
  async getAttendanceReports(filters) {
    return await AttendanceModel.getAllAttendance(filters);
  },

  // Check and notify low attendance
  async checkLowAttendance() {
    const lowAttendanceStudents = await AttendanceModel.checkLowAttendance();
    
    for (let student of lowAttendanceStudents) {
      // Notify student
      await NotificationModel.create(
        student.userId,
        `Your attendance is ${student.percentage.toFixed(2)}% which is below 50%. Please improve your attendance.`,
        'warning'
      );
      
      // Notify parent (if parent contact exists)
      const studentInfo = await StudentModel.findById(student.studentId);
      if (studentInfo.parentPhone) {
        // In production, send SMS/Email to parent
        console.log(`Parent notification: ${student.name}'s attendance is low (${student.percentage.toFixed(2)}%)`);
      }
    }
    
    return { message: 'Low attendance notifications sent', count: lowAttendanceStudents.length };
  }
};

module.exports = AdminController;
