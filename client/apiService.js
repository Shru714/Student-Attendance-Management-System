/**
 * API Service Layer
 * Handles all HTTP requests to the backend API
 * Replaces localStorage with database operations
 */

const API_BASE_URL = 'http://localhost:3000/api';

class APIService {
  /**
   * Make HTTP request with optional authentication
   */
  static async request(method, endpoint, data = null, requiresAuth = true) {
    try {
      console.log(`🌐 API Request: ${method} ${endpoint}`);
      
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      // Only add auth header if token exists and auth is required
      const token = localStorage.getItem('token');
      if (requiresAuth || token) {
        if (token) {
          options.headers['Authorization'] = `Bearer ${token}`;
          console.log('🔑 Authorization header added');
        } else if (requiresAuth) {
          console.warn('⚠️ No token found but auth is required');
        }
      }

      if (data) {
        options.body = JSON.stringify(data);
      }

      const url = `${API_BASE_URL}${endpoint}`;
      console.log(`📤 Fetching: ${url}`);
      
      const response = await fetch(url, options);
      
      console.log(`📥 Response status: ${response.status} ${response.statusText}`);
      
      // Handle unauthorized - try to auto-login as admin for testing
      if (response.status === 401 && !localStorage.getItem('adminAutoLogin')) {
        console.log('🔄 Attempting automatic admin login for testing...');
        localStorage.setItem('adminAutoLogin', 'true');
        try {
          await APIService.login('admin@example.com', 'Admin@143');
          localStorage.removeItem('adminAutoLogin');
          // Retry the original request
          console.log('🔄 Retrying original request after auto-login...');
          return await APIService.request(method, endpoint, data, requiresAuth);
        } catch (loginError) {
          localStorage.removeItem('adminAutoLogin');
          const error = await response.json();
          throw new Error(error.message || 'Authentication required');
        }
      }

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || `HTTP Error: ${response.status}`;
        } catch {
          errorMessage = errorText || `HTTP Error: ${response.status}`;
        }
        console.error(`❌ API Error: ${errorMessage}`);
        throw new Error(errorMessage);
      }

      const jsonResponse = await response.json();
      console.log(`✅ API Response received:`, Array.isArray(jsonResponse) ? `${jsonResponse.length} items` : 'Object');
      
      // If response has a 'data' property, return that (server wraps responses)
      if (jsonResponse && jsonResponse.data !== undefined) {
        return jsonResponse.data;
      }
      
      return jsonResponse;
    } catch (error) {
      console.error('❌ API Request Error:', error);
      throw error;
    }
  }

  // ==================== AUTH ====================
  static async register(userData) {
    return this.request('POST', '/register', userData, false);
  }

  static async login(email, password) {
    const response = await this.request('POST', '/login', { email, password }, false);
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('currentUser', response.user.email);
      localStorage.setItem('currentRole', response.user.role);
    }
    return response;
  }

  static async studentLogin(rollNumber, studentName, password) {
    const response = await this.request('POST', '/student/login', { 
      rollNumber, 
      studentName, 
      password 
    }, false);
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('currentStudentId', response.student.id);
      localStorage.setItem('currentRole', 'student');
    }
    return response;
  }

  // ==================== CLASSES ====================
  static async getAllClasses() {
    return this.request('GET', '/admin/classes');
  }

  static async createClass(classData) {
    return this.request('POST', '/admin/classes', classData);
  }

  static async updateClass(id, classData) {
    return this.request('PUT', '/admin/classes', { id, ...classData });
  }

  static async deleteClass(id) {
    return this.request('DELETE', `/admin/classes?id=${id}`);
  }

  // ==================== TEACHERS ====================
  static async getAllTeachers() {
    return this.request('GET', '/admin/teachers');
  }

  static async createTeacher(teacherData) {
    return this.request('POST', '/admin/teachers', teacherData);
  }

  static async updateTeacher(id, teacherData) {
    return this.request('PUT', '/admin/teachers', { id, ...teacherData });
  }

  static async deleteTeacher(id) {
    return this.request('DELETE', `/admin/teachers?id=${id}`);
  }

  static async getTeacherProfile() {
    return this.request('GET', '/teacher/profile');
  }

  static async getTeacherClasses() {
    return this.request('GET', '/teacher/my-classes');
  }

  // ==================== STUDENTS ====================
  static async getAllStudents() {
    console.log('📡 APIService.getAllStudents called');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('currentRole');
    
    console.log('Token:', token ? 'Present' : 'Missing');
    console.log('Role:', role);
    
    // Check if user is a teacher - use teacher endpoint
    if (role === 'teacher') {
      console.log('Using teacher endpoint for students');
      return this.request('GET', '/teacher/students');
    }
    // Admin uses admin endpoint
    console.log('Using admin endpoint for students');
    return this.request('GET', '/admin/students');
  }

  static async getStudentsByClass(classId) {
    const role = localStorage.getItem('currentRole');
    if (role === 'teacher') {
      return this.request('GET', `/teacher/students?classId=${classId}`);
    }
    // For admin, filter from all students
    const allStudents = await this.getAllStudents();
    return allStudents.filter(s => s.classId == classId || s.class_id == classId);
  }

  static async createStudent(studentData) {
    return this.request('POST', '/admin/students', studentData);
  }

  static async updateStudent(id, studentData) {
    return this.request('PUT', '/admin/students', { id, ...studentData });
  }

  static async deleteStudent(id) {
    return this.request('DELETE', `/admin/students?id=${id}`);
  }

  static async getStudentProfile() {
    return this.request('GET', '/student/profile');
  }

  static async getStudentAttendance() {
    const studentId = localStorage.getItem('currentStudentId');
    if (!studentId) {
      throw new Error('Student ID not found');
    }
    return this.request('GET', `/student/attendance?studentId=${studentId}`);
  }

  static async getStudentAttendancePercentage() {
    const studentId = localStorage.getItem('currentStudentId');
    if (!studentId) {
      throw new Error('Student ID not found');
    }
    return this.request('GET', `/student/percentage?studentId=${studentId}`);
  }

  // ==================== ATTENDANCE ====================
  static async createAttendanceSession(attendanceData) {
    return this.request('POST', '/teacher/mark-attendance', attendanceData);
  }

  static async getAttendanceRecords(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return this.request('GET', `/admin/attendance${params ? '?' + params : ''}`);
  }

  static async updateAttendanceRecord(id, recordData) {
    return this.request('PUT', '/admin/attendance', { id, ...recordData });
  }

  static async deleteAttendanceRecord(id) {
    return this.request('DELETE', `/admin/attendance?id=${id}`);
  }

  static async getTeacherAttendanceHistory(classId, subjectId = null) {
    console.log('=== API SERVICE: getTeacherAttendanceHistory ===');
    console.log('classId:', classId, 'type:', typeof classId);
    console.log('subjectId:', subjectId);
    
    if (!classId || classId === '' || classId === 'undefined' || classId === 'null') {
      console.error('Invalid classId provided:', classId);
      throw new Error('Class ID is required for attendance history');
    }
    
    const params = new URLSearchParams();
    params.append('classId', String(classId));
    if (subjectId) params.append('subjectId', String(subjectId));
    
    const url = `/teacher/history?${params.toString()}`;
    console.log('Fetching history from URL:', url);
    console.log('Full URL:', `${API_BASE_URL}${url}`);
    
    const result = await this.request('GET', url);
    console.log('History result:', result);
    return result;
  }

  // ==================== SUBJECTS ====================
  static async getAllSubjects() {
    return this.request('GET', '/admin/subjects');
  }

  static async createSubject(subjectData) {
    return this.request('POST', '/admin/subjects', subjectData);
  }

  static async updateSubject(id, subjectData) {
    return this.request('PUT', '/admin/subjects', { id, ...subjectData });
  }

  static async deleteSubject(id) {
    return this.request('DELETE', `/admin/subjects?id=${id}`);
  }

  // ==================== NOTIFICATIONS ====================
  static async getNotifications() {
    return this.request('GET', '/student/notifications');
  }

  static async markNotificationAsRead(notificationId) {
    return this.request('PUT', '/student/notifications', { id: notificationId });
  }

  // ==================== REPORTS ====================
  static async getStudentReport(studentId, filters = {}) {
    const params = new URLSearchParams({ studentId, ...filters }).toString();
    return this.request('GET', `/admin/reports/student?${params}`);
  }

  static async getDateReport(date, classId = null) {
    const params = new URLSearchParams({ date, ...(classId && { classId }) }).toString();
    return this.request('GET', `/admin/reports/date?${params}`);
  }

  // ==================== HEALTH CHECK ====================
  static async healthCheck() {
    return this.request('GET', '/health', null, false);
  }
}

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = APIService;
}
