const express = require('express');
const { likePost, unlikePost, getPostLikes } = require('../controllers/likeController');
const authenticate = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/', authenticate, likePost);
router.delete('/:id', authenticate, unlikePost);
router.get('/:postId', authenticate, getPostLikes);

module.exports = router;