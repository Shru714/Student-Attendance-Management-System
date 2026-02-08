const ClassModel = require('../models/classModel');
const UserModel = require('../models/userModel');
const StudentModel = require('../models/studentModel');
const AttendanceModel = require('../models/attendanceModel');
const bcrypt = require('bcryptjs');

const AdminController = {
  // Classes
  async getClasses() {
    return await ClassModel.getAll();
  },

  async createClass(data) {
    const { className, year, teacherId } = data;
    const id = await ClassModel.create(className, year, teacherId);
    return { message: 'Class created successfully', id };
  },

  async updateClass(data) {
    const { id, className, year, teacherId } = data;
    await ClassModel.update(id, className, year, teacherId);
    return { message: 'Class updated successfully' };
  },

  async deleteClass(id) {
    await ClassModel.delete(id);
    return { message: 'Class deleted successfully' };
  },

  // Teachers
  async getTeachers() {
    const users = await UserModel.getAll();
    return users.filter(u => u.role === 'teacher');
  },

  async createTeacher(data) {
    const { name, email, password, assignedClass } = data;
    const hashedPassword = await bcrypt.hash(password || 'teacher123', 10);
    const userId = await UserModel.create(name, email, hashedPassword, 'teacher');
    
    if (assignedClass) {
      const classes = await ClassModel.getAll();
      const classObj = classes.find(c => c.className === assignedClass);
      if (classObj) {
        await ClassModel.update(classObj.id, classObj.className, classObj.year, userId);
      }
    }
    
    return { message: 'Teacher created successfully', userId };
  },

  // Students
  async getStudents() {
    return await StudentModel.getAll();
  },

  async createStudent(data) {
    const { name, email, password, rollNumber, classId } = data;
    const hashedPassword = await bcrypt.hash(password || 'student123', 10);
    const userId = await UserModel.create(name, email, hashedPassword, 'student');
    const studentId = await StudentModel.create(userId, classId, rollNumber);
    return { message: 'Student created successfully', studentId };
  },

  async deleteStudent(id) {
    await StudentModel.delete(id);
    return { message: 'Student deleted successfully' };
  },

  // Attendance Reports
  async getAttendanceReports() {
    return await AttendanceModel.getAllAttendance();
  }
};

module.exports = AdminController;
