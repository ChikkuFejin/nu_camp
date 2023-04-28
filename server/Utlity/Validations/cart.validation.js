
const Joi = require('joi');

exports.add= Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().required(),
 
  });

  exports.update= Joi.object({
    quantity: Joi.number().required(),
 
  });

