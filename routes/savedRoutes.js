const express = require('express');
const { savePost, unsavePost, getSavedPosts } = require('../controllers/savedController');
const authenticate = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/', authenticate, savePost);
router.delete('/:id', authenticate, unsavePost);
router.get('/:userId', authenticate, getSavedPosts);

module.exports = router;