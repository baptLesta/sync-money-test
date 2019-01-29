const Data = require('./data.model');
const { to, sendError, sendSuccess } = require('../services/util.service');
const httpStatus = require('http-status');

/**
 * Create new data
 * @property {string} req.body.value - The value of the data
 * @returns {Data}
 */
async function create(req, res) {
  const dataInfo = req.body;

  const [err, data] = await to(Data.create(dataInfo));
  if (err) return sendError(res, err, httpStatus.UNPROCESSABLE_ENTITY);

  return sendSuccess(res, { data: data.toWeb() }, httpStatus.CREATED);
}

/**
 * Get data list.
 * @returns {Data[]}
 */
async function list(req, res) {
  let data, err;

  [err, data] = await to(Data.list()); // eslint-disable-line prefer-const
  if (err) return sendError(res, err, httpStatus.UNPROCESSABLE_ENTITY);

  data = data.map(data => data.toWeb());

  return sendSuccess(res, { data });
}

module.exports = { create, list };
