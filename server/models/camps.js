const { Sequelize,DataTypes } = require('sequelize');
const db = require('../util/database');

const MasterValues=require('./mastervalues.js')



const Camps = db.define('Camps', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    location_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false
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
    }
  }, {
    tableName: 'camps',
    timestamps: false
  });

  Camps.belongsTo(MasterValues, { foreignKey: 'location_id' });
  

module.exports=Camps