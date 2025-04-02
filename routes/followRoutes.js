const express = require('express');
const { followUser, unfollowUser, getFollowers, getFollowing, checkFollow, getFollowersCount, getFollowingCount } = require('../controllers/followController');
const authenticate = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/', authenticate, followUser);
router.delete('/:follower_id/:following_id', authenticate, unfollowUser);
router.get('/followers/:userId', authenticate, getFollowers);
router.get('/following/:userId', authenticate, getFollowing);
router.get('/check/:followerId/:followingId', authenticate, checkFollow);
router.get('/followersCount/:userId', authenticate, getFollowersCount);
router.get('/followingCount/:userId', authenticate, getFollowingCount);

module.exports = router;