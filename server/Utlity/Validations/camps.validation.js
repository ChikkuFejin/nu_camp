
const Joi = require('joi');

exports.createSchema= Joi.object({
    name: Joi.string().required(),
    phone: Joi.number().required(),
    email: Joi.string().email().required(),
    status: Joi.string().required(),
    location_id:Joi.number()
  });

  exports.updateSchema= Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    photo: Joi.any()
  });

