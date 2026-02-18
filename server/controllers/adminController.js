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
    try {
      const classes = await ClassModel.getAll();
      // Map database column names to client-expected names for backward compatibility
      return classes.map(cls => ({
        ...cls,
        className: cls.class_name || cls.className // Support both
      }));
    } catch (error) {
      throw { status: 500, message: 'Error fetching classes: ' + error.message };
    }
  },

  async createClass(data) {
    try {
      const { className, class_name, year, class_section } = data;
      
      // Support both className and class_name
      const name = className || class_name;
      
      // Validate required fields
      if (!name || !name.trim()) {
        throw { status: 400, message: 'class_name is required' };
      }
      if (!year || isNaN(parseInt(year))) {
        throw { status: 400, message: 'year must be a valid number (1-4)' };
      }
      
      const academicYear = this.getAcademicYear();
      const classData = {
        class_name: name.trim(),
        year: parseInt(year),
        class_section: class_section || null,
        academic_year: academicYear
      };
      
      const id = await ClassModel.create(classData);
      return { 
        status: 'success',
        message: 'Class created successfully', 
        id, 
        class_name: classData.class_name,
        year: classData.year,
        class_section: classData.class_section,
        academic_year: academicYear 
      };
    } catch (error) {
      if (error.status) throw error;
      throw { status: 500, message: 'Error creating class: ' + error.message };
    }
  },

  async updateClass(data) {
    try {
      const { id, className, class_name, year, class_section } = data;
      
      if (!id) {
        throw { status: 400, message: 'id is required' };
      }
      
      // Check if class exists
      const existingClass = await ClassModel.findById(id);
      if (!existingClass) {
        throw { status: 404, message: 'Class not found' };
      }
      
      if (year && isNaN(parseInt(year))) {
        throw { status: 400, message: 'year must be a valid number' };
      }
      
      // Support both className and class_name
      const name = className || class_name;
      
      const updateData = {};
      if (name) updateData.class_name = name.trim();
      if (year) updateData.year = parseInt(year);
      if (class_section !== undefined) updateData.class_section = class_section;
      
      await ClassModel.update(id, updateData);
      return { status: 'success', message: 'Class updated successfully' };
    } catch (error) {
      if (error.status) throw error;
      throw { status: 500, message: 'Error updating class: ' + error.message };
    }
  },

  async deleteClass(id) {
    try {
      if (!id) {
        throw { status: 400, message: 'id is required' };
      }
      
      // Check if class exists
      const existingClass = await ClassModel.findById(id);
      if (!existingClass) {
        throw { status: 404, message: 'Class not found' };
      }
      
      await ClassModel.delete(id);
      return { status: 'success', message: 'Class deleted successfully' };
    } catch (error) {
      if (error.status) throw error;
      throw { status: 500, message: 'Error deleting class: ' + error.message };
    }
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

  async updateSubject(data) {
    const { id, ...updateData } = data;
    if (!id) throw { status: 400, message: 'Subject ID is required' };
    
    const subject = await SubjectModel.findById(id);
    if (!subject) throw { status: 404, message: 'Subject not found' };
    
    await SubjectModel.update(id, updateData);
    return { message: 'Subject updated successfully' };
  },

  async deleteSubject(id) {
    if (!id) throw { status: 400, message: 'Subject ID is required' };
    
    const subject = await SubjectModel.findById(id);
    if (!subject) throw { status: 404, message: 'Subject not found' };
    
    await SubjectModel.delete(id);
    return { message: 'Subject deleted successfully' };
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
    try {
      console.log('AdminController.createTeacher called with:', data);
      const { name, email, password, teacherId, contactNo, subjectIds, years, classIds } = data;
      
      // Validate unique teacher ID
      const existingTeacher = await TeacherModel.findByTeacherId(teacherId);
      if (existingTeacher) {
        throw { status: 400, message: 'Teacher ID already exists' };
      }
      
      console.log('Creating user...');
      const hashedPassword = await bcrypt.hash(password || 'Teacher@143', 10);
      const userId = await UserModel.create(name, email, hashedPassword, 'teacher');
      console.log('User created with ID:', userId);
      
      // Create teacher record with unique teacher ID and contact
      console.log('Creating teacher record...');
      const teacherRecordId = await TeacherModel.create({
        user_id: userId,
        teacher_id: teacherId,
        contact_no: contactNo
      });
      console.log('Teacher record created with ID:', teacherRecordId);
      
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
      
      // Send notification - DISABLED: Notifications table only supports students
      // const academicYear = this.getAcademicYear();
      // await NotificationModel.create(
      //   userId,
      //   `Welcome! Your Teacher ID is ${teacherId}. You have been assigned subjects and classes for the academic year ${academicYear}.`,
      //   'info'
      // );
      
      // Return the complete teacher data
      const createdTeacher = await TeacherModel.findById(teacherRecordId);
      createdTeacher.subjects = await TeacherModel.getSubjects(teacherRecordId);
      createdTeacher.years = await TeacherModel.getYears(teacherRecordId);
      createdTeacher.classes = await TeacherModel.getClasses(teacherRecordId);
      
      return { 
        message: 'Teacher created successfully', 
        teacher: createdTeacher
      };
    } catch (error) {
      console.error('Error in createTeacher:', error);
      throw error;
    }
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
    const { student_name, email, address, student_contact, parent_contact, classId, rollNumber, password, classTime } = data;
    
    // Auto generate roll number if not provided
    const finalRollNumber = rollNumber || await ClassModel.getNextRollNumber(classId);
    
    // Use provided password or generate random one
    const finalPassword = password || Math.random().toString(36).slice(-8);
    
    // Set default class time if not provided
    const finalClassTime = classTime || '09:00:00';
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(finalPassword, 10);
    
    // Create student directly (no user table for students)
    const studentId = await StudentModel.create({
      student_name,
      email,
      roll_number: finalRollNumber,
      class_id: classId,
      address,
      student_contact,
      parent_contact,
      password: hashedPassword,
      class_time: finalClassTime
    });
    
    // Try to send notification (don't fail if it doesn't work)
    try {
      await NotificationModel.create(
        studentId,
        `Your account has been created. Roll Number: ${finalRollNumber}. Password: ${finalPassword}. Please login and change your password.`,
        'info'
      );
    } catch (notifError) {
      console.log('Note: Could not create notification:', notifError.message);
      // Continue anyway - notification is not critical
    }
    
    // Return complete student data
    const createdStudent = await StudentModel.findById(studentId);
    
    return { 
      message: 'Student created successfully', 
      student: createdStudent,
      rollNumber: finalRollNumber,
      password: finalPassword
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
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password directly in students table
    await StudentModel.update(studentId, { password: hashedPassword });
    
    await NotificationModel.create(
      studentId,
      'Your password has been updated successfully.',
      'info'
    );
    
    return { message: 'Password updated successfully' };
  },

  async deleteStudent(id) {
    await StudentModel.delete(id);
    return { message: 'Student deleted successfully' };
  },

  async updateStudent(data) {
    const { id, ...updateData } = data;
    if (!id) throw { status: 400, message: 'Student ID is required' };
    
    const student = await StudentModel.findById(id);
    if (!student) throw { status: 404, message: 'Student not found' };
    
    await StudentModel.update(id, updateData);
    const updated = await StudentModel.findById(id);
    return { message: 'Student updated successfully', data: updated };
  },

  // Attendance Reports with filters
  async getAttendanceReports(filters) {
    return await AttendanceModel.getAll(filters);
  },

  async updateAttendanceRecord(data) {
    const { id, ...updateData } = data;
    if (!id) throw { status: 400, message: 'Attendance record ID is required' };
    
    await AttendanceModel.update(id, updateData);
    return { message: 'Attendance record updated successfully' };
  },

  async deleteAttendanceRecord(id) {
    if (!id) throw { status: 400, message: 'Attendance record ID is required' };
    await AttendanceModel.delete(id);
    return { message: 'Attendance record deleted successfully' };
  },

  // Check and notify low attendance
  async checkLowAttendance() {
    const lowAttendanceStudents = await AttendanceModel.checkLowAttendance();
    
    for (let student of lowAttendanceStudents) {
      // Notify student
      await NotificationModel.create(
        student.studentId,  // Use studentId, not userId
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
