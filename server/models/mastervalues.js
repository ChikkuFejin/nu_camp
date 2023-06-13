const { DataTypes } = require('sequelize');
const db = require('../util/database');
const Camps = require('./camps');


const MaterValues = db.define('MasterValues', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    values: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    key: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
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
    tableName: 'master_values',
    timestamps: false
  });

  // Cart.belongsTo(Camps, { foreignKey: 'product_id' });
  

module.exports=MaterValues