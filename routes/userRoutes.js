const express = require('express');
const { signUp, logIn, getUserProfile } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/:id', getUserProfile);

module.exports = router;