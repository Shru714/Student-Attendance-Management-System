/**
 * Database Integration Handler
 * Bridges localStorage and API calls for smooth migration
 * Includes fallback to localStorage if API is unavailable
 */

class DatabaseIntegration {
  constructor() {
    this.useAPI = false; // Start with false, will be set to true after connection test
    this.useLocalStorage = true; // Fallback
    this.connectionTested = false;
    this.initPromise = this.initializeConnection();
  }

  async initializeConnection() {
    if (this.connectionTested) return;
    
    try {
      console.log('🔄 Testing API connection...');
      // Test API connection with a simple fetch
      const response = await fetch('http://localhost:3000/api/health');
      if (response.ok) {
        const data = await response.json();
        this.useAPI = true;
        this.connectionTested = true;
        console.log('✅ API connection established');
        console.log(`📊 Database: ${data.database?.name || 'Connected'}`);
      } else {
        throw new Error('API not responding');
      }
    } catch (error) {
      console.warn('⚠️ API connection failed, using localStorage fallback');
      console.warn('Error:', error.message);
      this.useAPI = false;
      this.connectionTested = true;
    }
  }

  // Get data from API or localStorage
  async getData(key) {
    // Wait for connection test to complete
    await this.initPromise;
    
    if (this.useAPI) {
      try {
        console.log(`🔄 Fetching ${key} from database...`);
        const data = await this.fetchFromAPI(key);
        console.log(`✅ Fetched ${key} from database:`, data.length, 'records');
        // Cache in localStorage
        this.saveToLocalStorage(key, data);
        return data;
      } catch (error) {
        console.error(`❌ Failed to fetch ${key} from API:`, error.message);
        console.warn(`⚠️ Falling back to localStorage for ${key}`);
        const localData = this.getFromLocalStorage(key);
        console.log(`📦 Retrieved ${localData.length} ${key} from localStorage`);
        return localData;
      }
    }
    console.log(`📦 Using localStorage for ${key}`);
    return this.getFromLocalStorage(key);
  }

  // Save data to API and localStorage
  async saveData(key, data) {
    // Wait for connection test to complete
    await this.initPromise;
    
    // Save to localStorage as cache
    this.saveToLocalStorage(key, data);

    if (this.useAPI) {
      try {
        return await this.saveToAPI(key, data);
      } catch (error) {
        console.warn(`Failed to save ${key} to API`, error);
        return { success: false, cached: true };
      }
    }
    return { success: true, cached: true };
  }

  // ==================== API OPERATIONS ====================

  async fetchFromAPI(key) {
    try {
      switch (key) {
        case 'classes':
          return await APIService.getAllClasses();
        case 'teachers':
          return await APIService.getAllTeachers();
        case 'students':
          console.log('📥 Fetching students from API...');
          const students = await APIService.getAllStudents();
          console.log('✅ Students fetched:', students.length, 'records');
          return students;
        case 'subjects':
          return await APIService.getAllSubjects();
        case 'attendance':
          return await APIService.getAttendanceRecords();
        case 'notifications':
          return await APIService.getNotifications();
        default:
          return this.getFromLocalStorage(key);
      }
    } catch (error) {
      console.error(`❌ Error fetching ${key} from API:`, error);
      throw error;
    }
  }

  async saveToAPI(key, data) {
    // Implement specific save logic per entity
    console.log(`Syncing ${key} to database...`);
    // This would be called after individual create/update/delete operations
    return { success: true };
  }

  // ==================== LOCALSTORAGE OPERATIONS ====================

  getFromLocalStorage(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return [];
    }
  }

  saveToLocalStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error writing to localStorage: ${key}`, error);
    }
  }
}

// Initialize database integration
const db = new DatabaseIntegration();

// ==================== INTEGRATED CRUD FUNCTIONS ====================

/**
 * CLASSES - Database Operations
 */
const ClassesDB = {
  async getAll() {
    return await db.getData('classes');
  },

  async create(classData) {
    try {
      const response = await APIService.createClass(classData);
      // Refresh classes list
      const classes = await db.getData('classes');
      if (!Array.isArray(classes)) {
        db.saveToLocalStorage('classes', [response]);
      } else {
        classes.push(response);
        await db.saveData('classes', classes);
      }
      return response;
    } catch (error) {
      console.error('Error creating class:', error);
      throw error;
    }
  },

  async update(id, classData) {
    try {
      const response = await APIService.updateClass(id, classData);
      const classes = await db.getData('classes');
      const index = classes.findIndex(c => c.id === id);
      if (index !== -1) {
        classes[index] = { ...classes[index], ...classData };
        await db.saveData('classes', classes);
      }
      return response;
    } catch (error) {
      console.error('Error updating class:', error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const response = await APIService.deleteClass(id);
      const classes = await db.getData('classes');
      const filtered = classes.filter(c => c.id !== id);
      await db.saveData('classes', filtered);
      return response;
    } catch (error) {
      console.error('Error deleting class:', error);
      throw error;
    }
  }
};

/**
 * TEACHERS - Database Operations
 */
const TeachersDB = {
  async getAll() {
    return await db.getData('teachers');
  },

  async create(teacherData) {
    try {
      const response = await APIService.createTeacher(teacherData);
      const teachers = await db.getData('teachers');
      
      // Extract the teacher object from response
      const newTeacher = response.teacher || response;
      
      if (!Array.isArray(teachers)) {
        db.saveToLocalStorage('teachers', [newTeacher]);
      } else {
        teachers.push(newTeacher);
        await db.saveData('teachers', teachers);
      }
      return newTeacher;
    } catch (error) {
      console.error('Error creating teacher:', error);
      throw error;
    }
  },

  async update(id, teacherData) {
    try {
      const response = await APIService.updateTeacher(id, teacherData);
      const teachers = await db.getData('teachers');
      const index = teachers.findIndex(t => t.id === id);
      if (index !== -1) {
        teachers[index] = { ...teachers[index], ...teacherData };
        await db.saveData('teachers', teachers);
      }
      return response;
    } catch (error) {
      console.error('Error updating teacher:', error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const response = await APIService.deleteTeacher(id);
      const teachers = await db.getData('teachers');
      const filtered = teachers.filter(t => t.id !== id);
      await db.saveData('teachers', filtered);
      return response;
    } catch (error) {
      console.error('Error deleting teacher:', error);
      throw error;
    }
  }
};

/**
 * STUDENTS - Database Operations
 */
const StudentsDB = {
  async getAll() {
    return await db.getData('students');
  },

  async create(studentData) {
    try {
      const response = await APIService.createStudent(studentData);
      const students = await db.getData('students');
      
      // Extract the student object from response
      const newStudent = response.student || response;
      
      if (!Array.isArray(students)) {
        db.saveToLocalStorage('students', [newStudent]);
      } else {
        students.push(newStudent);
        await db.saveData('students', students);
      }
      return response;
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  },

  async update(id, studentData) {
    try {
      const response = await APIService.updateStudent(id, studentData);
      const students = await db.getData('students');
      const index = students.findIndex(s => s.id === id);
      if (index !== -1) {
        students[index] = { ...students[index], ...studentData };
        await db.saveData('students', students);
      }
      return response;
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const response = await APIService.deleteStudent(id);
      const students = await db.getData('students');
      const filtered = students.filter(s => s.id !== id);
      await db.saveData('students', filtered);
      return response;
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  }
};

/**
 * ATTENDANCE - Database Operations
 */
const AttendanceDB = {
  async getAll(filters = {}) {
    try {
      if (db.useAPI) {
        return await APIService.getAttendanceRecords(filters);
      }
    } catch (error) {
      console.warn('Failed to fetch from API, using localStorage');
    }
    return db.getFromLocalStorage('attendance');
  },

  async create(attendanceData) {
    try {
      const response = await APIService.createAttendanceSession(attendanceData);
      const attendance = await db.getData('attendance');
      if (!Array.isArray(attendance)) {
        db.saveToLocalStorage('attendance', [response]);
      } else {
        attendance.push(response);
        await db.saveData('attendance', attendance);
      }
      return response;
    } catch (error) {
      console.error('Error creating attendance record:', error);
      throw error;
    }
  },

  async update(id, recordData) {
    try {
      const response = await APIService.updateAttendanceRecord(id, recordData);
      const attendance = await db.getData('attendance');
      const index = attendance.findIndex(a => a.id === id);
      if (index !== -1) {
        attendance[index] = { ...attendance[index], ...recordData };
        await db.saveData('attendance', attendance);
      }
      return response;
    } catch (error) {
      console.error('Error updating attendance:', error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const response = await APIService.deleteAttendanceRecord(id);
      const attendance = await db.getData('attendance');
      const filtered = attendance.filter(a => a.id !== id);
      await db.saveData('attendance', filtered);
      return response;
    } catch (error) {
      console.error('Error deleting attendance:', error);
      throw error;
    }
  }
};

// Helper function to show notification
function showNotification(message, type = 'info') {
  console.log(`[${type.toUpperCase()}] ${message}`);
  if (type === 'success') {
    alert(`✅ ${message}`);
  } else if (type === 'error') {
    alert(`❌ ${message}`);
  }
}
