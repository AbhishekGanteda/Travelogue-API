const Post = require('../models/Post');
const SavedPost = require('../models/savedPost');
const { Op } = require("sequelize");

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
        const { userId } = req.params;
        const posts = await Post.findAll({
            where: {
                user_id: { [Op.ne]: userId }
            }
        });
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
        const { postId } = req.params;
        const { place_name, description, latitude, longitude } = req.body;
        const lat = latitude ? parseFloat(latitude) : null;
        const lon = longitude ? parseFloat(longitude) : null;
        await Post.update(
            { place_name, description, latitude: lat, longitude: lon },
            { where: { id: postId } }
        );
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

exports.getSavedPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const savedPosts = await SavedPost.findAll({
            where: { user_id: userId },
            include: [{
                model: Post,
                as: 'post'
            }]
        });
        const postsList = savedPosts.map(savedPost => savedPost.post);
        res.status(200).json(postsList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserPostsCount = async (req, res) => {
    try {
        const count = await Post.count({ where: { user_id: req.params.userId } });
        res.json(count);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};