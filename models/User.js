const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    profile_image: { type: DataTypes.STRING, defaultValue: null },
    followers_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    following_count: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { timestamps: true });

module.exports = User;