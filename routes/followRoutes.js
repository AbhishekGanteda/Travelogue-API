const express = require('express');
const { followUser, unfollowUser, getFollowers, getFollowing } = require('../controllers/followController');
const authenticate = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/', authenticate, followUser);
router.delete('/', authenticate, unfollowUser);
router.get('/followers/:userId', authenticate, getFollowers);
router.get('/following/:userId', authenticate, getFollowing);

module.exports = router;