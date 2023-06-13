const {DataTypes} = require('sequelize');
const db = require('../util/database');
const bcrypt = require('bcrypt');
const Config = require('../util/config:js');


const MasterValues=require('./mastervalues')
const Beds=require('./beds')
const Category=require('./category');
const Camers = require('./campers');



const Reservations = db.define('Reservations', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  
  bed_id:{
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  camper_id:{
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  catering_id:{
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
  },
  check_in_date:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  check_out_date:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  actual_check_out_date:{ 
    type: DataTypes.DATE,
    allowNull: true,
  },
  check_out_type_id:{
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
  },
  is_pay:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:false
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

}, {
  tableName: 'reservations',
  timestamps: true,
});

Reservations.belongsTo(MasterValues, { foreignKey: 'check_out_type_id' })
Reservations.belongsTo(Beds, { foreignKey: 'bed_id' })
Reservations.belongsTo(Category, { foreignKey: 'catering_id' })
Reservations.belongsTo(Camers, { foreignKey: 'camper_id' })
module.exports = Reservations;


