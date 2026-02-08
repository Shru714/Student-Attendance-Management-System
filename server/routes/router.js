const url = require('url');
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

    // Admin Routes
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

    if (path === '/api/admin/students' && method === 'DELETE') {
      await authorize(['admin'])(req);
      const result = await AdminController.deleteStudent(query.id);
      return { status: 200, data: result };
    }

    if (path === '/api/admin/attendance' && method === 'GET') {
      await authorize(['admin'])(req);
      const result = await AdminController.getAttendanceReports();
      return { status: 200, data: result };
    }

    // Teacher Routes
    if (path === '/api/teacher/my-class' && method === 'GET') {
      const user = await authorize(['teacher'])(req);
      const result = await TeacherController.getMyClass(user.id);
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
      const result = await TeacherController.getHistory(query.classId);
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
