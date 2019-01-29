const express = require('express');
const dataCtrl = require('./data.controller');

const router = express.Router(); // eslint-disable-line new-cap

router
  .route('/')
  /** GET /api/movies - Get list of movies */
  .get(dataCtrl.list)

  /** POST /api/movies - Create new movie */
  .post(dataCtrl.create);

module.exports = router;
