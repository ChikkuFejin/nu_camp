const {DataTypes} = require('sequelize');
const db = require('../util/database');

const Config = require('../util/config:js');


// Define the `Category` model
const RoomCategories = db.define('RoomCategories', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    description:{
      type:DataTypes.TEXT,
      allowNull: true
    },
    price: {
        type: DataTypes.DOUBLE(8,2),
        allowNull: false
      },
   

    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'inactive'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: 'room_categories',
    timestamps: true,
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
  }
  );
 
 
  RoomCategories.getCategory=async()=>{
    let data=await Category.findAll({where:{status:"active"}});
    return createCategoryTree(data)
  }

  module.exports = RoomCategories;


  