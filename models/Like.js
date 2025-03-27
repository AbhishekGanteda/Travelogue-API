// models/Like.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); 
const Post = require('./Post'); 

const Like = sequelize.define('Like', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  post_id: { type: DataTypes.INTEGER, allowNull: false },
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'post_id'],
    },
  ],
});

User.hasMany(Like, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Post.hasMany(Like, { foreignKey: 'post_id', onDelete: 'CASCADE' });
Like.belongsTo(User, { foreignKey: 'user_id' });
Like.belongsTo(Post, { foreignKey: 'post_id' });

module.exports = Like;
