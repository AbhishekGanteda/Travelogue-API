const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const path = require("path");


exports.signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password_hash: hashedPassword });
        const userResponse = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        res.status(201).json({ user: userResponse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.logIn = async (req, res) => {
    try {
        const { email, password_hash } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password_hash, user.password_hash))) {
            return res.status(401);
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        let imagePath = null;
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.profile_image) {
            const rootDir = path.resolve(__dirname, "..");
            const oldImagePath = path.join(rootDir, "uploads", path.basename(user.profile_image));

            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
                console.log(`Deleted old image: ${oldImagePath}`);
            }
        }

        if (name == "") name = null
        if (email == "") email = null
        await User.update(
            {
                name: name || user.name,
                email: email || user.email,
                profile_image: imagePath || user.profile_image,
            },
            { where: { id } }
        );

        // Fetch the updated user from the database
        const updatedUser = await User.findByPk(id);
        console.log(updatedUser);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
