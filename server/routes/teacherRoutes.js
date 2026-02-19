const express = require('express');
const { getAssignedClasses, getStudentsBySubject, getDashboardStats } = require('../controllers/teacherController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(auth);
router.use(authorize('teacher'));

router.get('/classes', getAssignedClasses);
router.get('/students/:subjectId', getStudentsBySubject);
router.get('/dashboard', getDashboardStats);

module.exports = router;
