const SavedPost = require('../models/savedPost');

exports.savePost = async (req, res) => {
    try {
        const savedPost = await SavedPost.create(req.body);
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.unsavePost = async (req, res) => {
    try {
        await SavedPost.destroy({ where: { user_id: req.params.userId, post_id: req.params.postId } });
        console.log("Called saved destroy")
        res.json({ message: 'Post unsaved successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPostsCount = async (req, res) => {
    try {
        const savedCount = await SavedPost.count({ where: { post_id: req.params.postId } });
        res.json(savedCount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.postSavedOrNot = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.query;
        const save = await SavedPost.findOne({
            where: { post_id: postId, user_id: userId }
        });
        res.json({ isSaved: save !== null });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
