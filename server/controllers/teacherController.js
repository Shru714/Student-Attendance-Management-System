const ClassModel = require('../models/classModel');
const StudentModel = require('../models/studentModel');
const AttendanceModel = require('../models/attendanceModel');
const TeacherAssignmentModel = require('../models/teacherAssignmentModel');

const TeacherController = {
  async getMyClasses(teacherId) {
    const assignments = await TeacherAssignmentModel.getByTeacherId(teacherId);
    return { assignments };
  },

  async markAttendance(data) {
    const { classId, subjectId, date, records, startTime, endTime } = data;

    // Check if attendance is within allowed time window
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // minutes since midnight
    
    // Parse end time (e.g., "10:30" -> 630 minutes)
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const endTimeMinutes = endHour * 60 + endMinute;
    
    // Add 30 minute grace period
    const lockTimeMinutes = endTimeMinutes + 30;
    
    if (currentTime > lockTimeMinutes) {
      throw { 
        status: 403, 
        message: `Attendance time closed. Attendance for ${startTime}-${endTime} must be marked before ${Math.floor(lockTimeMinutes/60)}:${(lockTimeMinutes%60).toString().padStart(2, '0')}`
      };
    }

    let attendance = await AttendanceModel.findAttendance(classId, subjectId, date);
    
    if (attendance) {
      // Check if already locked
      const isLocked = await AttendanceModel.isAttendanceLocked(attendance.id);
      if (isLocked) {
        throw { status: 403, message: 'Attendance is locked and cannot be modified' };
      }
    } else {
      const attendanceId = await AttendanceModel.createAttendance(classId, subjectId, date, startTime, endTime);
      attendance = { id: attendanceId };
    }

    for (const record of records) {
      await AttendanceModel.createRecord(attendance.id, record.studentId, record.status);
    }

    return { message: 'Attendance marked successfully' };
  },

  async getHistory(classId, subjectId) {
    const students = await StudentModel.getByClassId(classId);
    const history = [];

    for (const student of students) {
      const attendance = await AttendanceModel.getStudentAttendance(student.id);
      const filtered = subjectId 
        ? attendance.filter(a => a.subjectId == subjectId)
        : attendance;
        
      history.push({
        studentId: student.id,
        studentName: student.name,
        rollNumber: student.rollNumber,
        attendance: filtered
      });
    }

    return history;
  },

  async getMySubjects(teacherId) {
    const assignments = await TeacherAssignmentModel.getByTeacherId(teacherId);
    const subjects = [...new Set(assignments.map(a => ({
      id: a.subjectId,
      name: a.subjectName,
      code: a.subjectCode
    })))];
    return subjects;
  }
};

module.exports = TeacherController;
