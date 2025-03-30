const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    try {
        const { user_id, place_name, description, latitude, longitude } = req.body;
        const image = req.file ? req.file.filename : null; // Get uploaded image filename

        const newPost = await Post.create({
        user_id,
        place_name,
        description,
        image,
        latitude,
        longitude,
        });

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({ where: { user_id: req.params.userId } });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        await Post.update(req.body, { where: { id: req.params.id } });
        res.json({ message: 'Post updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        await Post.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
