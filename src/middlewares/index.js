const validateDisplayName = require('./displayName');
const validateEmail = require('./email');
const validatePassword = require('./password');
const validatetoken = require('./validateJWT');

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
  validatetoken,
};