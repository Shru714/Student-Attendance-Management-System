const ClassModel = require('../models/classModel');
const StudentModel = require('../models/studentModel');
const AttendanceModel = require('../models/attendanceModel');
const TeacherModel = require('../models/teacherModel');
const TeacherAssignmentModel = require('../models/teacherAssignmentModel');

const TeacherController = {
  async getMyProfile(userId) {
    const teacher = await TeacherModel.findByUserId(userId);
    if (!teacher) {
      throw { status: 404, message: 'Teacher profile not found' };
    }
    return await TeacherModel.getProfile(teacher.id);
  },

  async getMyClasses(userId) {
    const teacher = await TeacherModel.findByUserId(userId);
    if (!teacher) {
      throw { status: 404, message: 'Teacher profile not found' };
    }
    const assignments = await TeacherAssignmentModel.getByTeacherId(teacher.id);
    
    // Get unique class IDs
    const classIds = [...new Set(assignments.map(a => a.class_id))];
    
    // Fetch full class details for each class
    const classes = [];
    for (const classId of classIds) {
      const classData = await ClassModel.findById(classId);
      if (classData) {
        // Add class time from assignment
        const assignment = assignments.find(a => a.class_id === classId);
        classData.class_time = assignment?.class_time || '09:00:00';
        classes.push(classData);
      }
    }
    
    return { assignments, classes };
  },

  async markAttendance(data) {
    console.log('=== MARK ATTENDANCE BACKEND ===');
    console.log('Received data:', JSON.stringify(data, null, 2));
    
    const { classId, date, records, startTime } = data;

    if (!classId || !date || !records || records.length === 0) {
      throw { status: 400, message: 'Missing required fields: classId, date, or records' };
    }

    // Use startTime or current time
    const time = startTime || new Date().toTimeString().slice(0, 5);
    console.log('Using time:', time);

    // Save each attendance record
    const results = [];
    for (const record of records) {
      try {
        console.log('Processing record:', record);
        
        const attendanceData = {
          class_id: classId,
          student_id: record.studentId,
          date: date,
          time: time,
          status: record.status
        };
        
        console.log('Saving attendance data:', attendanceData);
        const id = await AttendanceModel.create(attendanceData);
        console.log('Saved with ID:', id);
        
        results.push({ id, ...attendanceData });
      } catch (error) {
        console.error(`Error saving attendance for student ${record.studentId}:`, error);
        throw error;
      }
    }

    console.log('All records saved successfully:', results.length);
    return { 
      message: 'Attendance marked successfully',
      count: results.length,
      records: results
    };
  },

  async getHistory(classId, subjectId) {
    if (!classId) {
      throw { status: 400, message: 'Class ID is required' };
    }

    const students = await StudentModel.getByClassId(classId);
    const history = [];

    for (const student of students) {
      const attendance = await AttendanceModel.getStudentAttendance(student.id);
      const filtered = subjectId 
        ? attendance.filter(a => a.subjectId == subjectId)
        : attendance;
        
      history.push({
        studentId: student.id,
        studentName: student.student_name || student.name,
        rollNumber: student.roll_number || student.rollNumber,
        attendance: filtered
      });
    }

    return history;
  },

  async getMySubjects(userId) {
    const teacher = await TeacherModel.findByUserId(userId);
    if (!teacher) {
      throw { status: 404, message: 'Teacher profile not found' };
    }
    const subjects = await TeacherModel.getSubjects(teacher.id);
    return subjects;
  },

  async getStudents(userId, classId) {
    const teacher = await TeacherModel.findByUserId(userId);
    if (!teacher) {
      throw { status: 404, message: 'Teacher profile not found' };
    }

    // If classId is provided, verify teacher has access to this class
    if (classId) {
      const assignments = await TeacherAssignmentModel.getByTeacherId(teacher.id);
      const hasAccess = assignments.some(a => a.class_id == classId);
      
      if (!hasAccess) {
        throw { status: 403, message: 'Access denied to this class' };
      }
      
      // Return students for specific class
      return await StudentModel.getByClassId(classId);
    }

    // If no classId, return all students from teacher's assigned classes
    const assignments = await TeacherAssignmentModel.getByTeacherId(teacher.id);
    const classIds = [...new Set(assignments.map(a => a.class_id))];
    
    const allStudents = [];
    for (const cId of classIds) {
      const students = await StudentModel.getByClassId(cId);
      allStudents.push(...students);
    }
    
    return allStudents;
  }
};

module.exports = TeacherController;
