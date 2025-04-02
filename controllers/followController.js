const Follower = require('../models/Follower');

exports.followUser = async (req, res) => {
    try {
        const follow = await Follower.create(req.body);
        res.status(201).json(follow);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.unfollowUser = async (req, res) => {
    try {
        await Follower.destroy({ where: { follower_id: req.params.follower_id, following_id: req.params.following_id } });
        res.json({ message: 'Unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFollowers = async (req, res) => {
    try {
        const followers = await Follower.findAll({ where: { following_id: req.params.userId } });
        res.json(followers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFollowing = async (req, res) => {
    try {
        const following = await Follower.findAll({ where: { follower_id: req.params.userId } });
        res.json(following);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.checkFollow = async (req, res) => {
    const { followerId, followingId } = req.params;
    const follow = await Follower.findOne({
        where: { follower_id: followerId, following_id: followingId }
    });
    res.json({ isFollow: follow !== null });
}

exports.getFollowersCount = async (req,res) => {
    try {
        const count = await Follower.count({ where: { following_id: req.params.userId } });
        res.json(count);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getFollowingCount = async (req,res) => {
    try {
        const count = await Follower.count({ where: { follower_id: req.params.userId } });
        res.json(count);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}