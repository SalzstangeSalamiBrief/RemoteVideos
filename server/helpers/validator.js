/**
 * File for functions which validate input
 */

/**
 * Validate if the password is valid
 * @param {String} password
 */
function validatePassword (password) {
  // password does not have a length of 8 or more and does not match the pattern
  const securityPWRegexp = /^([a-zA-Z0-9]|[$%&/()\\=\][{}]){8,}$/;
  if (securityPWRegexp.test(password)) {
    return true;
  }
  return false;
}

/**
 * Validate if the username is valid
 * @param {String} username
 */
function validateUsername (username) {
  const securityUsernameRegexp = /^[a-zA-Z0-9]{8,20}$/;
  // username does not have a length of 8 or more and does not match the pattern
  if (securityUsernameRegexp.test(username)) {
    return true;
  }
  return false;
}

/**
 * validate if the given is valid
 * @param {String} key
 */
function validateKey (key) {
  const possibleKeys = ['space', 'tab', 'enter', 'up', 'down', 'f', 'shift-n'];
  return possibleKeys.includes(key);
}
module.exports = {
  validatePassword,
  validateUsername,
  validateKey,
};
