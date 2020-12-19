/**
 * File for functions which validate input
 */
const securityPWRegexp = /^([a-zA-Z0-9]|[$%&/()\\=\][{}]){8,}$/;
const securityUsernameRegexp = /^[a-zA-Z0-9]{8,20}$/;
const possibleKeys = ['space', 'tab', 'enter', 'up', 'down', 'f', 'shift-n', 'k', 'm', 's', '0'];
/**
 * Validate if the password is valid
 * @param {String} password
 */
function validatePassword (password) {
  // password does not have a length of 8 or more and does not match the pattern
  if (password) {
    return securityPWRegexp.test(password);
  }
  return false;
}

/**
 * Validate if the username is valid
 * @param {String} username
 */
function validateUsername (username) {
  // username does not have a length of 8 or more and does not match the pattern
  if (username) {
    return securityUsernameRegexp.test(username);
  }
  return false;
}

/**
 * validate if the given is valid
 * @param {String} key
 */
function validateKey (key) {
  return possibleKeys.includes(key);
}

module.exports = {
  validatePassword,
  validateUsername,
  validateKey,
};
