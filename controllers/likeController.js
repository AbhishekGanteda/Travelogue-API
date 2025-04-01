const Like = require('../models/Like');

exports.likePost = async (req, res) => {
    try {
        const like = await Like.create(req.body);
        res.status(201).json(like);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.unlikePost = async (req, res) => {
    try {
        await Like.destroy({ where: { user_id: req.params.userId, post_id: req.params.postId } });
        res.json({ message: 'Post unliked successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLikesCount = async (req, res) => {
    try {
        const likeCount = await Like.count({ where: { post_id: req.params.postId } });
        console.log("came to getLikesCount  "+likeCount)
        res.json(likeCount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.postLikedOrNot = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.query;
        const like = await Like.findOne({
            where: { post_id: postId, user_id: userId }
        });
        console.log("came to postLikedOrNot  "+like !== null)
        res.json({ isLiked: like !== null });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


