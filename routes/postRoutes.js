const express = require('express');
const { createPost, getPosts, getUserPosts, updatePost, deletePost, getSavedPosts, getUserPostsCount, getPostById } = require('../controllers/postController');
const router = express.Router();
const upload = require('../config/multerConfig');
const authenticate = require('../middleware/authenticateToken');


router.post('/', authenticate, upload.single('image'), createPost);
router.get('/all/:userId', authenticate, getPosts);
router.get('/:userId', authenticate, getUserPosts);
router.put('/:postId', authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);
router.get('/saved/:userId', authenticate, getSavedPosts);
router.get('/count/:userId', authenticate, getUserPostsCount);
router.get('/post/:id', authenticate, getPostById);
 
module.exports = router;