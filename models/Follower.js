const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Follower = sequelize.define('Follower', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  follower_id: { type: DataTypes.INTEGER, allowNull: false },
  following_id: { type: DataTypes.INTEGER, allowNull: false },
}, {
  timestamps: true, 
  indexes: [
    {
      unique: true,
      fields: ['follower_id', 'following_id'], 
    },
  ],
});

User.hasMany(Follower, { foreignKey: 'follower_id', onDelete: 'CASCADE' });
User.hasMany(Follower, { foreignKey: 'following_id', onDelete: 'CASCADE' });
Follower.belongsTo(User, { foreignKey: 'follower_id' });
Follower.belongsTo(User, { foreignKey: 'following_id' });

module.exports = Follower;
