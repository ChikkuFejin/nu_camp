const {DataTypes} = require('sequelize');
const db = require('../util/database');
const bcrypt = require('bcrypt');
const Config = require('../util/config:js');



const User = db.define('User', {
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
    allowNull: true
  },
  email_verified_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING(191),
    allowNull: true
  },
  photo: {
    type: DataTypes.STRING(191),
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false,
    defaultValue: 'user'
  },
  provider: {
    type: DataTypes.STRING(191),
    allowNull: true
  },
  provider_id: {
    type: DataTypes.STRING(191),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active'
  },
  remember_token: {
    type: DataTypes.STRING(100),
    allowNull: true
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
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});
User.beforeCreate(async (user) => {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

User.prototype.comparePassword = (candidatePassword)=> {
  console.log("🚀 ~ file: user.js:95 ~ candidatePassword", candidatePassword,this.password)
  return  bcrypt.compareSync(this.password, candidatePassword);
}


// function(candidatePassword, callback) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//     if (err) { return callback(err); }
//     callback(null, isMatch);
//   });
// };
module.exports = User;


