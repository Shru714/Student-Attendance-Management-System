const ClassModel = require('../models/classModel');
const UserModel = require('../models/userModel');
const StudentModel = require('../models/studentModel');
const AttendanceModel = require('../models/attendanceModel');
const SubjectModel = require('../models/subjectModel');
const TeacherModel = require('../models/teacherModel');
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
    const teachers = await TeacherModel.getAll();
    
    // Get assignments for each teacher
    for (let teacher of teachers) {
      teacher.subjects = await TeacherModel.getSubjects(teacher.id);
      teacher.years = await TeacherModel.getYears(teacher.id);
      teacher.classes = await TeacherModel.getClasses(teacher.id);
      teacher.assignments = await TeacherAssignmentModel.getByTeacherId(teacher.id);
    }
    
    return teachers;
  },

  async createTeacher(data) {
    const { name, email, password, phone, teacherId, contactNo, subjectIds, years, classIds } = data;
    
    // Validate unique teacher ID
    const existingTeacher = await TeacherModel.findByTeacherId(teacherId);
    if (existingTeacher) {
      throw { status: 400, message: 'Teacher ID already exists' };
    }
    
    const hashedPassword = await bcrypt.hash(password || 'teacher123', 10);
    const userId = await UserModel.create(name, email, hashedPassword, 'teacher', phone);
    
    // Create teacher record with unique teacher ID and contact
    const teacherRecordId = await TeacherModel.create(userId, teacherId, contactNo);
    
    // Assign multiple subjects
    if (subjectIds && subjectIds.length > 0) {
      await TeacherModel.assignSubjects(teacherRecordId, subjectIds);
    }
    
    // Assign multiple years
    if (years && years.length > 0) {
      await TeacherModel.assignYears(teacherRecordId, years);
    }
    
    // Assign multiple classes
    if (classIds && classIds.length > 0) {
      await TeacherModel.assignClasses(teacherRecordId, classIds);
    }
    
    // Create teacher assignments (class-subject combinations)
    if (subjectIds && classIds && subjectIds.length > 0 && classIds.length > 0) {
      const assignments = [];
      for (let subjectId of subjectIds) {
        for (let classId of classIds) {
          assignments.push({ classId, subjectId });
        }
      }
      await TeacherAssignmentModel.assignMultiple(teacherRecordId, assignments);
    }
    
    // Send notification
    const academicYear = this.getAcademicYear();
    await NotificationModel.create(
      userId,
      `Welcome! Your Teacher ID is ${teacherId}. You have been assigned subjects and classes for the academic year ${academicYear}.`,
      'info'
    );
    
    return { message: 'Teacher created successfully', userId, teacherId };
  },

  async updateTeacher(data) {
    const { id, contactNo, subjectIds, years, classIds } = data;
    
    // Update contact number
    if (contactNo) {
      await TeacherModel.update(id, contactNo);
    }
    
    // Update subjects
    if (subjectIds) {
      await TeacherModel.assignSubjects(id, subjectIds);
    }
    
    // Update years
    if (years) {
      await TeacherModel.assignYears(id, years);
    }
    
    // Update classes
    if (classIds) {
      await TeacherModel.assignClasses(id, classIds);
    }
    
    // Update teacher assignments
    if (subjectIds && classIds) {
      await TeacherAssignmentModel.removeByTeacherId(id);
      const assignments = [];
      for (let subjectId of subjectIds) {
        for (let classId of classIds) {
          assignments.push({ classId, subjectId });
        }
      }
      await TeacherAssignmentModel.assignMultiple(id, assignments);
    }
    
    return { message: 'Teacher updated successfully' };
  },

  async deleteTeacher(id) {
    await TeacherModel.delete(id);
    return { message: 'Teacher deleted successfully' };
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
