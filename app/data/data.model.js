const mongoose = require('mongoose');

/**
 * Data Schema
 */
const DataSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true
  }
});

/**
 * Methods
 */
DataSchema.method({
  toWeb: function() { // eslint-disable-line
    const json = this.toJSON();
    json.id = this._id; // this is for the front end
    return json;
  }
});

/**
 * Statics
 */
DataSchema.statics = {
  /**
   * List Data
   * @returns {Promise<Data[]>}
   */
  list() {
    return this.find()
      .exec();
  }
};

/**
 * @typedef Data
 */
module.exports = mongoose.model('Data', DataSchema);
