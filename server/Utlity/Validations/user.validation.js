
const Joi = require('joi');

exports.schema= Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    photo: Joi.any()
  });

  exports.updateSchema= Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    photo: Joi.any()
  });

  exports.authSchema= Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  });