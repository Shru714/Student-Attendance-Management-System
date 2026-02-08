const ClassModel = require('../models/classModel');
const StudentModel = require('../models/studentModel');
const AttendanceModel = require('../models/attendanceModel');

const TeacherController = {
  async getMyClass(teacherId) {
    const classes = await ClassModel.getAll();
    const myClass = classes.find(c => c.teacherId === teacherId);
    
    if (!myClass) {
      return { message: 'No class assigned' };
    }

    const students = await StudentModel.getByClassId(myClass.id);
    return { class: myClass, students };
  },

  async markAttendance(data) {
    const { classId, date, records } = data;

    let attendance = await AttendanceModel.findAttendance(classId, date);
    
    if (!attendance) {
      const attendanceId = await AttendanceModel.createAttendance(classId, date);
      attendance = { id: attendanceId };
    }

    for (const record of records) {
      await AttendanceModel.createRecord(attendance.id, record.studentId, record.status);
    }

    return { message: 'Attendance marked successfully' };
  },

  async getHistory(classId) {
    const students = await StudentModel.getByClassId(classId);
    const history = [];

    for (const student of students) {
      const attendance = await AttendanceModel.getStudentAttendance(student.id);
      history.push({
        studentId: student.id,
        studentName: student.name,
        rollNumber: student.rollNumber,
        attendance
      });
    }

    return history;
  }
};

module.exports = TeacherController;
