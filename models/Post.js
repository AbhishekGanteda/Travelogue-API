const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const User = require('./User');

const Post = sequelize.define('Post', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  place_name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  image: { type: DataTypes.STRING, defaultValue: null },
  latitude: { type: DataTypes.DOUBLE, allowNull: false },
  longitude: { type: DataTypes.DOUBLE, allowNull: false },
}, { timestamps: true });

User.hasMany(Post, { foreignKey: 'user_id' , onDelete: 'CASCADE'});
Post.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = Post;