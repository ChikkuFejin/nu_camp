const { DataTypes } = require('sequelize');
const db = require('../util/database');

const Camps=require('./camps.js')
const RoomCategories=require('./roomCategories.js')



const Rooms = db.define('Rooms', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    room_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
        
      },
    
    camp_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true
      },
      room_category_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true
      },
      is_available:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
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
    tableName: 'rooms',
    timestamps: false
  });

  Rooms.belongsTo(Camps, { foreignKey: 'camp_id' });
  Rooms.belongsTo(RoomCategories, { foreignKey: 'room_category_id' });
  

module.exports=Camps