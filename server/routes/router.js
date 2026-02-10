const url = require('url');
const db = require('../config/db');
const AuthController = require('../controllers/authController');
const AdminController = require('../controllers/adminController');
const TeacherController = require('../controllers/teacherController');
const StudentController = require('../controllers/studentController');
const { authorize } = require('../middleware/authMiddleware');

const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject({ status: 400, message: 'Invalid JSON' });
      }
    });
  });
};

const router = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;
  const query = parsedUrl.query;

  try {
    // Health Check Route (for testing database connection)
    if (path === '/api/health' && method === 'GET') {
      try {
        const [result] = await db.query('SELECT 1 as test');
        const [dbName] = await db.query('SELECT DATABASE() as db_name');
        const [tables] = await db.query('SHOW TABLES');
        
        return { 
          status: 200, 
          data: { 
            status: 'ok',
            message: 'Server and database are running',
            database: {
              connected: true,
              name: dbName[0].db_name,
              tables: tables.length
            },
            timestamp: new Date().toISOString()
          } 
        };
      } catch (error) {
        return { 
          status: 500, 
          data: { 
            status: 'error',
            message: 'Database connection failed',
            database: {
              connected: false,
              error: error.message
            },
            timestamp: new Date().toISOString()
          } 
        };
      }
    }

    // Root Route
    if (path === '/' && method === 'GET') {
      return {
        status: 200,
        data: {
          message: 'Attendance Management System API',
          version: '1.0.0',
          endpoints: {
            health: '/api/health',
            auth: {
              register: 'POST /api/register',
              login: 'POST /api/login',
              studentLogin: 'POST /api/student/login'
            },
            admin: {
              classes: '/api/admin/classes',
              subjects: '/api/admin/subjects',
              teachers: '/api/admin/teachers',
              students: '/api/admin/students',
              attendance: '/api/admin/attendance'
            },
            teacher: {
              profile: '/api/teacher/profile',
              classes: '/api/teacher/my-classes',
              subjects: '/api/teacher/my-subjects',
              markAttendance: '/api/teacher/mark-attendance',
              history: '/api/teacher/history'
            },
            student: {
              profile: '/api/student/profile',
              attendance: '/api/student/attendance',
              percentage: '/api/student/percentage',
              notifications: '/api/student/notifications'
            }
          }
        }
      };
    }

    // Auth Routes
    if (path === '/api/register' && method === 'POST') {
      const data = await parseBody(req);
      const result = await AuthController.register(data);
      return { status: 201, data: result };
    }

    if (path === '/api/login' && method === 'POST') {
      const data = await parseBody(req);
      const result = await AuthController.login(data);
      return { status: 200, data: result };
    }

    if (path === '/api/student/login' && method === 'POST') {
      const data = await parseBody(req);
      const result = await AuthController.studentLogin(data);
      return { status: 200, data: result };
    }

    // Admin - Classes
    if (path === '/api/admin/classes' && method === 'GET') {
      await authorize(['admin'])(req);
      const result = await AdminController.getClasses();
      return { status: 200, data: result };
    }

    if (path === '/api/admin/classes' && method === 'POST') {
      await authorize(['admin'])(req);
      const data = await parseBody(req);
      const result = await AdminController.createClass(data);
      return { status: 201, data: result };
    }

    if (path === '/api/admin/classes' && method === 'PUT') {
      await authorize(['admin'])(req);
      const data = await parseBody(req);
      const result = await AdminController.updateClass(data);
      return { status: 200, data: result };
    }

    if (path === '/api/admin/classes' && method === 'DELETE') {
      await authorize(['admin'])(req);
      const result = await AdminController.deleteClass(query.id);
      return { status: 200, data: result };
    }

    // Admin - Subjects
    if (path === '/api/admin/subjects' && method === 'GET') {
      await authorize(['admin'])(req);
      const result = await AdminController.getSubjects();
      return { status: 200, data: result };
    }

    if (path === '/api/admin/subjects' && method === 'POST') {
      await authorize(['admin'])(req);
      const data = await parseBody(req);
      const result = await AdminController.createSubject(data);
      return { status: 201, data: result };
    }

    // Admin - Teachers
    if (path === '/api/admin/teachers' && method === 'GET') {
      await authorize(['admin'])(req);
      const result = await AdminController.getTeachers();
      return { status: 200, data: result };
    }

    if (path === '/api/admin/teachers' && method === 'POST') {
      await authorize(['admin'])(req);
      const data = await parseBody(req);
      const result = await AdminController.createTeacher(data);
      return { status: 201, data: result };
    }

    if (path === '/api/admin/teachers' && method === 'PUT') {
      await authorize(['admin'])(req);
      const data = await parseBody(req);
      const result = await AdminController.updateTeacher(data);
      return { status: 200, data: result };
    }

    if (path === '/api/admin/teachers' && method === 'DELETE') {
      await authorize(['admin'])(req);
      const result = await AdminController.deleteTeacher(query.id);
      return { status: 200, data: result };
    }

    // Admin - Students
    if (path === '/api/admin/students' && method === 'GET') {
      await authorize(['admin'])(req);
      const result = await AdminController.getStudents();
      return { status: 200, data: result };
    }

    if (path === '/api/admin/students' && method === 'POST') {
      await authorize(['admin'])(req);
      const data = await parseBody(req);
      const result = await AdminController.createStudent(data);
      return { status: 201, data: result };
    }

    if (path === '/api/admin/students/bulk' && method === 'POST') {
      await authorize(['admin'])(req);
      const data = await parseBody(req);
      const result = await AdminController.bulkCreateStudents(data);
      return { status: 201, data: result };
    }

    if (path === '/api/admin/students/password' && method === 'PUT') {
      await authorize(['admin'])(req);
      const data = await parseBody(req);
      const result = await AdminController.updateStudentPassword(data);
      return { status: 200, data: result };
    }

    if (path === '/api/admin/students' && method === 'DELETE') {
      await authorize(['admin'])(req);
      const result = await AdminController.deleteStudent(query.id);
      return { status: 200, data: result };
    }

    // Admin - Attendance Reports
    if (path === '/api/admin/attendance' && method === 'GET') {
      await authorize(['admin'])(req);
      const result = await AdminController.getAttendanceReports(query);
      return { status: 200, data: result };
    }

    if (path === '/api/admin/check-low-attendance' && method === 'POST') {
      await authorize(['admin'])(req);
      const result = await AdminController.checkLowAttendance();
      return { status: 200, data: result };
    }

    // Teacher Routes
    if (path === '/api/teacher/profile' && method === 'GET') {
      const user = await authorize(['teacher'])(req);
      const result = await TeacherController.getMyProfile(user.id);
      return { status: 200, data: result };
    }

    if (path === '/api/teacher/my-classes' && method === 'GET') {
      const user = await authorize(['teacher'])(req);
      const result = await TeacherController.getMyClasses(user.id);
      return { status: 200, data: result };
    }

    if (path === '/api/teacher/my-subjects' && method === 'GET') {
      const user = await authorize(['teacher'])(req);
      const result = await TeacherController.getMySubjects(user.id);
      return { status: 200, data: result };
    }

    if (path === '/api/teacher/mark-attendance' && method === 'POST') {
      await authorize(['teacher'])(req);
      const data = await parseBody(req);
      const result = await TeacherController.markAttendance(data);
      return { status: 200, data: result };
    }

    if (path === '/api/teacher/history' && method === 'GET') {
      await authorize(['teacher'])(req);
      const result = await TeacherController.getHistory(query.classId, query.subjectId);
      return { status: 200, data: result };
    }

    // Student Routes
    if (path === '/api/student/profile' && method === 'GET') {
      const user = await authorize(['student'])(req);
      const result = await StudentController.getProfile(user.id);
      return { status: 200, data: result };
    }

    if (path === '/api/student/attendance' && method === 'GET') {
      await authorize(['student'])(req);
      const result = await StudentController.getAttendance(query.studentId);
      return { status: 200, data: result };
    }

    if (path === '/api/student/percentage' && method === 'GET') {
      await authorize(['student'])(req);
      const result = await StudentController.getPercentage(query.studentId);
      return { status: 200, data: result };
    }

    if (path === '/api/student/notifications' && method === 'GET') {
      const user = await authorize(['student'])(req);
      const result = await StudentController.getNotifications(user.id);
      return { status: 200, data: result };
    }

    if (path === '/api/student/notifications/read' && method === 'PUT') {
      await authorize(['student'])(req);
      const data = await parseBody(req);
      const result = await StudentController.markNotificationRead(data.notificationId);
      return { status: 200, data: result };
    }

    // 404 Not Found
    return { status: 404, data: { message: 'Route not found' } };

  } catch (error) {
    return {
      status: error.status || 500,
      data: { message: error.message || 'Internal server error' }
    };
  }
};

module.exports = router;
