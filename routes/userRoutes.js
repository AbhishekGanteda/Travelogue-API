const express = require('express');
const { signUp, logIn, getUserProfile, updateUserProfile } = require('../controllers/userController');
const authenticate = require('../middleware/authenticateToken');
const router = express.Router();
const upload = require('../config/multerConfig');

router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/:id', getUserProfile);
router.put('/update/:id', upload.single('image'), updateUserProfile);

module.exports = router;