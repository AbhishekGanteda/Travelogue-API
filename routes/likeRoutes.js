const express = require('express');
const { likePost, unlikePost, getPostLikes } = require('../controllers/likeController');
const router = express.Router();

router.post('/', likePost);
router.delete('/:id', unlikePost);
router.get('/:postId', getPostLikes);

module.exports = router;