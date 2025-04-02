const express = require('express');
const { likePost, unlikePost, getLikesCount, postLikedOrNot } = require('../controllers/likeController');
const authenticate = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/', authenticate, likePost);
router.delete('/:userId/:postId', authenticate, unlikePost);
router.get('/:postId', authenticate, getLikesCount);
router.get('/liked/:postId', authenticate, postLikedOrNot);

module.exports = router;