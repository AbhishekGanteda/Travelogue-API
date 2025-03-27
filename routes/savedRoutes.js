const express = require('express');
const { savePost, unsavePost, getSavedPosts } = require('../controllers/savedController');
const router = express.Router();

router.post('/', savePost);
router.delete('/:id', unsavePost);
router.get('/:userId', getSavedPosts);

module.exports = router;