const { Sequelize, DataTypes } = require('sequelize'); // Added DataTypes to the destructured import
const db = require('../util/database');
const Rooms = require('./rooms.js');

const Beds = db.define('Beds', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED, // Fixed Sequelize to DataTypes
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  number: {
    type: DataTypes.STRING(10), // Removed UNIQUE since it's not a valid option for data types
    allowNull: false,
  },
  room_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true
  },
  room_category_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  status: {
    type: DataTypes.ENUM('available', 'booked', 'maintenance'),
    allowNull: false,
    defaultValue: 'available'
  },
  created_at: {
    type: DataTypes.DATE, // Fixed Sequelize to DataTypes
    allowNull: true
  },
  updated_at: {
    type: DataTypes.DATE, // Fixed Sequelize to DataTypes
    allowNull: true
  }
}, {
  tableName: 'beds',
  timestamps: false
});

Beds.belongsTo(Rooms, { foreignKey: 'room_id' });

module.exports = Beds;
