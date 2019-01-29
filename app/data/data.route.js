const express = require('express');
const dataCtrl = require('./data.controller');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');

const router = express.Router(); // eslint-disable-line new-cap

router
  .route('/')
  /** GET /api/data - Get list of data */
  .get(dataCtrl.list)

  /** POST /api/data - Create new data */
  .post(validate(paramValidation.createData), dataCtrl.create);

module.exports = router;
