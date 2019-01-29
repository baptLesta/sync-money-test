const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../../index');

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Data APIs', () => {
  const data = {
    value: 'sync is cool'
  };

  describe('# POST /api/data', () => {
    it('should create a new data', (done) => {
      request(app)
        .post('/api/data')
        .send(data)
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body.data.value).to.equal(data.value);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/data/', () => {
    it('should get all data', (done) => {
      request(app)
        .get('/api/data')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.data).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });
});
