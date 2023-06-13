const { Sequelize, DataTypes } = require('sequelize'); // Added DataTypes to the destructured import
const db = require('../util/database');
const User = require('./user');



// Define a model for a 'roles' table
const Role = db.define('roles', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  });
  
  // Define a model for a 'permissions' table
  const Permission = db.define('permissions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  });
  
  // Define a model for a 'role_permissions' table
  const RolePermission = db.define('role_permissions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });
  
  // Define a model for a 'user_roles' table
  const UserRole = db.define('user_roles', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });
  
  // Define associations between the models
  Role.belongsToMany(Permission, { through: RolePermission });
  Permission.belongsToMany(Role, { through: RolePermission });
  
  // Users.belongsToMany(Role, { through: UserRole });
  // Role.belongsToMany(User, { through: UserRole });
  
  // Middleware to check if the user has the required permission
  const hasPermission = (permissionName) => async (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).send('Unauthorized');
    }
    const permission = await Permission.findOne({ where: { name: permissionName } });
    const roles = await user.getRoles();
    for (const role of roles) {
      const hasPermission = await role.hasPermission(permission);
      if (hasPermission) {
        return next();
      }
    }
    return res.status(403).send('Forbidden');
  };

  module.exports={
    Role,
    Permission,
    RolePermission,
    UserRole,
    hasPermission,
    
  }
  
//   // Route that requires 'read' permission
//   app.get('/users', hasPermission('read'), async (req, res) => {
//     const result = await User.findAll();
//     res.send(result);
//   });
  
//   // Route that requires 'write' permission
//   app.post('/users', hasPermission('write'), async (req, res) => {
//     const { name, email } = req.body;
//     const result = await User.create({ name, email });
//     res.send(result);
//   });
  