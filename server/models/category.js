const {DataTypes} = require('sequelize');
const db = require('../util/database');

const Config = require('../util/config:js');
const MasterValues=require('./mastervalues.js')

// Define the `Category` model
const Category = db.define('Category', {
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
    parent_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    type_id: {
      type: DataTypes.BIGINT.UNSIGNED,
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
    tableName: 'categories',
    timestamps: true,
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
  }
  );
  Category.hasMany(Category, { foreignKey: 'parent_id' });
  Category.belongsTo(MasterValues, { foreignKey: 'location_id' });

  Category.getCategoryTree=async()=>{
    let data=await Category.findAll({where:{status:"active"}});
    return createCategoryTree(data)
  }

  module.exports = Category;

  function createCategoryTree(categories, parentId = null) {
    const tree = [];
  
    for (let category of categories.filter(c => c.parent_id === parentId)) {
      tree.push({
        ...category?.dataValues||{},
        children: createCategoryTree(categories, category.id)
      });
    }
  
    return tree;
  }

  