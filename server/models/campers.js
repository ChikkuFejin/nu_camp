const {DataTypes} = require('sequelize');
const db = require('../util/database');
const bcrypt = require('bcrypt');
const Config = require('../util/config:js');


const MasterValues=require('./mastervalues')

const Camers = db.define('Camers', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(191),
    allowNull: false,
    validate: {
              notNull: {
                msg: 'Please enter your name',
              },
              len: {
                args: [2, 50],
                msg: 'Name should be between 2 and 50 characters',
              },
            },
  },
  email: {
    type: DataTypes.STRING(191),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  email_verified_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  type_id:{
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },

  photo: {
    type: DataTypes.STRING(191),
    allowNull: true
  },
  
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active'
  },

  created_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  imageUrlFull: {
    type: DataTypes.VIRTUAL,
    get() {
      const baseUrl = Config.baseurl; // your base URL
      return this.getDataValue('photo')?`${baseUrl}/${this.getDataValue('photo')}`:""; // use string concatenation to concatenate the base URL and image URL
    },
  },
}, {
  tableName: 'campers',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

Camers.belongsTo(MasterValues, { foreignKey: 'type_id' })
module.exports = Camers;


