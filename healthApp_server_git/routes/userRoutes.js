// routes/userRoutes.js
const express = require('express');
const { signup, login, logout, getUser, getUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/user', getUser);
router.get('/api/users', getUsers);

module.exports = router;
