const express = require('express');
const { savePost, unsavePost, getPostsCount, postSavedOrNot, getSavedPostList } = require('../controllers/savedController');
const authenticate = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/', authenticate, savePost);
router.delete('/:userId/:postId', authenticate, unsavePost);
router.get('/:postId', authenticate, getPostsCount);
router.get('/saved/:postId', authenticate, postSavedOrNot);

module.exports = router;