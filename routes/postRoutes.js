const express = require('express');
const { createPost, getPosts, getUserPosts, updatePost, deletePost } = require('../controllers/postController');
const router = express.Router();
const upload = require('../config/multerConfig');
const authenticate = require('../middleware/authenticateToken');


router.post('/', authenticate, upload.single('image'), createPost);
router.get('/', authenticate, getPosts);
router.get('/:userId', authenticate, getUserPosts);
router.put('/:id', authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);

module.exports = router;