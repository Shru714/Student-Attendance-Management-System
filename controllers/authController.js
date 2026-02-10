const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const StudentModel = require('../models/studentModel');

const AuthController = {
  async register(data) {
    const { name, email, password, role, rollNumber, classId } = data;

    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      throw { status: 400, message: 'Email already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await UserModel.create(name, email, hashedPassword, role);

    if (role === 'student' && rollNumber && classId) {
      await StudentModel.create(userId, classId, rollNumber);
    }

    return { message: 'User registered successfully', userId };
  },

  async login(data) {
    const { email, password } = data;

    if (!email || !password) {
      throw { status: 400, message: 'Email and password are required' };
    }

    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw { status: 401, message: 'Invalid credentials' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw { status: 401, message: 'Invalid credentials' };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    let additionalData = {};
    if (user.role === 'student') {
      const studentInfo = await StudentModel.findByUserId(user.id);
      additionalData = { studentId: studentInfo?.id, rollNumber: studentInfo?.rollNumber };
    }

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        ...additionalData
      }
    };
  },

  async studentLogin(data) {
    const { studentName, rollNumber, password } = data;

    if (!studentName || !rollNumber || !password) {
      throw { status: 400, message: 'Student name, roll number, and password are required' };
    }

    // Find student by roll number
    const student = await StudentModel.findByRollNumber(rollNumber);
    if (!student) {
      throw { status: 401, message: 'Invalid roll number' };
    }

    // Check if student name matches (case-insensitive)
    if (student.student_name.toLowerCase() !== studentName.toLowerCase()) {
      throw { status: 401, message: 'Student name does not match the roll number' };
    }

    // Check if password matches student name (password should be same as student name)
    if (password.toLowerCase() !== student.student_name.toLowerCase()) {
      throw { status: 401, message: 'Invalid password. Hint: Your password is the same as your student name' };
    }

    // Generate token
    const token = jwt.sign(
      { id: student.id, studentName: student.student_name, rollNumber: student.rollNumber, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    return {
      token,
      student: {
        id: student.id,
        student_name: student.student_name,
        rollNumber: student.rollNumber,
        email: student.email,
        classId: student.classId,
        className: student.className
      }
    };
  }
};

module.exports = AuthController;
