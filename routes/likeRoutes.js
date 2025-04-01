const express = require('express');
const { likePost, unlikePost, getLikesCount, postLikedOrNot } = require('../controllers/likeController');
const authenticate = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/', authenticate, likePost);
router.delete('/:userId/:postId', authenticate, unlikePost);
router.get('/:postId', getLikesCount);
router.get('/liked/:postId', postLikedOrNot);

module.exports = router;