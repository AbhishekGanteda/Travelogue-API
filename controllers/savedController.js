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
        await SavedPost.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Post unsaved successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSavedPosts = async (req, res) => {
    try {
        const savedPosts = await SavedPost.findAll({ where: { user_id: req.params.userId } });
        res.json(savedPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
