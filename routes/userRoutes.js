const express = require('express');
const { signUp, logIn, getUserProfile } = require('../controllers/userController');
const authenticate = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/:id', authenticate, getUserProfile);

module.exports = router;