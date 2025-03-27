const express = require('express');
const { createPost, getPosts, getUserPosts, updatePost, deletePost } = require('../controllers/postController');
const router = express.Router();

router.post('/', createPost);
router.get('/', getPosts);
router.get('/:userId', getUserPosts);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;