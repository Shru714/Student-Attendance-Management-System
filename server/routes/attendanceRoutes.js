const express = require('express');
const { markAttendance, getAttendanceByDate, getStudentAttendance, getAttendanceReport } = require('../controllers/attendanceController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.post('/mark', authorize('teacher'), markAttendance);
router.get('/date', authorize('teacher'), getAttendanceByDate);
router.get('/student', authorize('student'), getStudentAttendance);
router.get('/report', authorize('teacher', 'admin'), getAttendanceReport);

module.exports = router;
