const express = require('express');
const { followUser, unfollowUser, getFollowers, getFollowing } = require('../controllers/followController');
const router = express.Router();

router.post('/', followUser);
router.delete('/', unfollowUser);
router.get('/followers/:userId', getFollowers);
router.get('/following/:userId', getFollowing);

module.exports = router;