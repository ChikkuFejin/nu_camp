const User = require('../models/user');
const fs = require('fs');
const { fileupload } = require('../Utlity/fileuploads');

const Validation=require('../Utlity/Validations/user.validation');
const Config = require('../util/config:js');
const { getImageSorcePath, updatePhoto } = require('../util/functions');
// CRUD Controllers
const mediapath = Config.baseurl
//get all users
exports.getUsers = (req, res, next) => {
    
    User.findAll()
        .then(users => {
            res.status(200).json({ data: users });
        })
        .catch(err => console.log(err));
}

//get user by id
exports.getUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            res.status(200).json({ user: user });
        })
        .catch(err => console.log(err));
}

//create user
exports.createUser = async(req, res, next) => {

    const { error, value } = Validation.schema.validate(req.body, { abortEarly: false });

    if (error) {
      // If there are validation errors, return a 400 Bad Request response with the validation errors
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map((error) => error.message)
      });
    }

   


        try {
          // Get the user data from the request body
          const { name, email, password, role } = req.body;
      
          // Check if the email already exists
          const existingUser = await User.findOne({ where: { email } });
          if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
          }
          
          // Create a new user object with the provided data
          const filePath = req?.file?.path? getImageSorcePath(req.file.path) :"";

          const newUser = {
            name,
            email,
            password,
            role,
            photo:filePath
          };
      
          // Create the new user in the database
          const createdUser = await User.create(newUser);
      
          // Send a response with the created user data
          return res.status(201).json(createdUser);
        } catch (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server Error' });
        }

      
}

exports.updateUser = async(req, res, next) => {
  const userId = req.params.userId
  const { error, value } = Validation.updateSchema.validate(req.body, { abortEarly: false });

  if (error) {
    // If there are validation errors, return a 400 Bad Request response with the validation errors
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map((error) => error.message)
    });
  }


      try {
        // Get the user data from the request body
        const { name, email } = req.body;
        const user=await User.findOne({ where: { id:userId } })
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        const photo = req?.file?.path? getImageSorcePath(req.file.path)
         :"";
        if(photo && user.photo){
            updatePhoto(`public/${user.photo}`)
        }

        user.name=name
        user.email=email
        user.photo=photo||user.photo

   

            await user.save();

           return res.status(200).json({
              message: 'User updated successfully',
              data: user,
            });

      
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
      }

    
}

//update user
// exports.updateUser = (req, res, next) => {
//   const userId = req.params.userId;
//   const updatedName = req.body.name;
//   const updatedEmail = req.body.email;
//   User.findByPk(userId)
//     .then(user => {
//       if (!user) {
//         return res.status(404).json({ message: 'User not found!' });
//       }
//       user.name = updatedName;
//       user.email = updatedEmail;
//       return user.save();
//     })
//     .then(result => {
//       res.status(200).json({message: 'User updated!', user: result});
//     })
//     .catch(err => console.log(err));
// }

//delete user
exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      return User.destroy({
        where: {
          id: userId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'User deleted!' });
    })
    .catch(err => console.log(err));
}