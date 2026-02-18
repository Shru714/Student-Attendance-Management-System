const StudentModel = require('../models/studentModel');
const AttendanceModel = require('../models/attendanceModel');
const NotificationModel = require('../models/notificationModel');

const StudentController = {
  async getProfile(studentId) {
    // For students, the ID in the token is the student ID directly (not user_id)
    const student = await StudentModel.findById(studentId);
    if (!student) {
      throw { status: 404, message: 'Student profile not found' };
    }
    return student;
  },

  async getAttendance(studentId) {
    return await AttendanceModel.getStudentAttendance(studentId);
  },

  async getPercentage(studentId) {
    const attendance = await AttendanceModel.getStudentAttendance(studentId);
    
    const total = attendance.length;
    const present = attendance.filter(a => a.status && a.status.toLowerCase() === 'present').length;
    const absent = attendance.filter(a => a.status && a.status.toLowerCase() === 'absent').length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;

    return {
      total,
      present,
      absent,
      percentage: parseFloat(percentage)
    };
  },

  async getNotifications(studentId) {
    // For students, use student ID directly
    return await NotificationModel.getByUserId(studentId);
  },

  async markNotificationRead(notificationId) {
    await NotificationModel.markAsRead(notificationId);
    return { message: 'Notification marked as read' };
  }
};

module.exports = StudentController;
