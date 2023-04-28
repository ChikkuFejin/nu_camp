const { Sequelize } = require('sequelize');
const db = require('../util/database');
const Product = require('./product');

const Cart = db.define('Cart', {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false
    },
    order_id: {
      type: Sequelize.BIGINT.UNSIGNED
    },
    user_id: {
      type: Sequelize.BIGINT.UNSIGNED
    },
    price: {
      type: Sequelize.FLOAT(8, 2),
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('new', 'progress', 'delivered', 'cancel'),
      allowNull: false,
      defaultValue: 'new'
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    amount: {
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
    tableName: 'carts',
    timestamps: false
  });

  Cart.belongsTo(Product, { foreignKey: 'product_id' });
  

module.exports=Cart