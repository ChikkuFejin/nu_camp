const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Config = require('../util/config:js');

const Validation=require('../Utlity/Validations/user.validation');
const User = require('../models/user');

exports.login=async (req, res) => {
    const { email, password } = req.body;
    const { error, value } = Validation.authSchema.validate(req.body, { abortEarly: false });

    if (error) {
      // If there are validation errors, return a 400 Bad Request response with the validation errors
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map((error) => error.message)
      });
    }
  
    // check if email and password are valid
    // ...
  
    // generate a token
    // const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    //   expiresIn: '1h',
    // });
  


    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        //validate password
        const isPasswordValid =  bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        const token = jwt.sign({ userId: user.id }, Config.JWT_SECRET);
         return res.status(200).json({
        data:{
            token
        }
    })
    
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }


  }