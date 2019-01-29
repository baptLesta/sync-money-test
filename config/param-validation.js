const Joi = require('joi');

module.exports = {
  // POST /api/data
  createData: {
    body: {
      data: {
        value: Joi.string().alphanum().required()
      }
    }
  }
};
