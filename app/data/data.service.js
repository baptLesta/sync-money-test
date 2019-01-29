const crypto2 = require('crypto2');
const Data = require('../data/data.model');
const { to, throwError } = require('../services/util.service');

/**
* Return data with crypted value
* @param {object} dataInfo
* @property {string} dataInfo.value
* @returns {Data}
*/
async function createData(dataInfo) {
  const { value } = dataInfo;
  let err, data, encryptedValue;

  const publicKey = await crypto2.readPublicKey('publicKey.pem');

  [err, encryptedValue] = await to(crypto2.encrypt.rsa(value, publicKey));
  if (err) throwError('Error occurs during the crypt of the value.');

  dataInfo.value = encryptedValue;

  [err, data] = await to(Data.create(dataInfo));
  if (err) throwError('Error occurs during create the data in mongo');

  return data;
}

/**
* Return the decrypted value
* @param {string} encryptedValue
* @returns {value}
*/
function decryptedValue(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const privateKey = await crypto2.readPrivateKey('privateKey.pem');
      const decryptedValue = await crypto2.decrypt.rsa(data.value, privateKey);

      data.value = decryptedValue;

      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
}

/**
* Return all the data with uncrypted value
* @param {array} cryptedData
* @returns {Array<Data>}
*/
async function listDecrypted() {
  let err, encryptedDataArray, decryptedDataArray;

  [err, encryptedDataArray] = await to(Data.find());
  if (err) throwError('Error occurs during getting the crypt data.');

  const results = encryptedDataArray.map(decryptedValue);
  [err, decryptedDataArray] = await to(Promise.all(results));
  if (err) throwError('Error occurs during the decrypt of the data.');

  return decryptedDataArray;
}

module.exports = {
  createData,
  listDecrypted
};
