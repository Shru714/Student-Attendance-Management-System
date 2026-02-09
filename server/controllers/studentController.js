const StudentModel = require('../models/studentModel');
const AttendanceModel = require('../models/attendanceModel');
const NotificationModel = require('../models/notificationModel');

const StudentController = {
  async getProfile(userId) {
    const student = await StudentModel.findByUserId(userId);
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
    const present = attendance.filter(a => a.status === 'Present').length;
    const absent = attendance.filter(a => a.status === 'Absent').length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;

    return {
      total,
      present,
      absent,
      percentage: parseFloat(percentage)
    };
  },

  async getNotifications(userId) {
    return await NotificationModel.getByUserId(userId);
  },

  async markNotificationRead(notificationId) {
    await NotificationModel.markAsRead(notificationId);
    return { message: 'Notification marked as read' };
  }
};

module.exports = StudentController;
