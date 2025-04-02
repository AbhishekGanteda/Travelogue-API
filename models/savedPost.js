// models/SavedPost.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); 
const Post = require('./Post'); 

const SavedPost = sequelize.define('SavedPost', {
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

User.hasMany(SavedPost, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Post.hasMany(SavedPost, { foreignKey: 'post_id', onDelete: 'CASCADE' });
SavedPost.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
SavedPost.belongsTo(Post, { foreignKey: 'post_id', as: 'post', onDelete: 'CASCADE'});

module.exports = SavedPost;
