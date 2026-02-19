const express = require('express');
const { createUser, getUsers, toggleUserStatus, getDashboardStats } = require('../controllers/adminController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(auth);
router.use(authorize('admin'));

router.post('/create-user', createUser);
router.get('/users', getUsers);
router.patch('/users/:userId/status', toggleUserStatus);
router.get('/dashboard', getDashboardStats);

module.exports = router;
