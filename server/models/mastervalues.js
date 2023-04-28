const { Sequelize } = require('sequelize');
const db = require('../util/database');


const MaterValues = db.define('MasterValues', {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    values: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    key: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
   
    price: {
      type: Sequelize.FLOAT(8, 2),
      allowNull: false
    },
    
    created_at: {
      type: Sequelize.DATE,
      allowNull: true
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }, {
    tableName: 'master_values',
    timestamps: false
  });

//   Cart.belongsTo(Product, { foreignKey: 'product_id' });
  

module.exports=MaterValues