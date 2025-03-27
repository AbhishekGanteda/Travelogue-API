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
        await Like.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Post unliked successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPostLikes = async (req, res) => {
    try {
        const likes = await Like.findAll({ where: { post_id: req.params.postId } });
        res.json(likes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
