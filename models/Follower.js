const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Follower = sequelize.define('Follower', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  follower_id: { type: DataTypes.INTEGER, allowNull: false },
  following_id: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: true });

module.exports = Follower;