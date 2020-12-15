/**
 * Class for validating inputs
 */
class Validator {
  constructor () {
    this.usernameRegexp = /^[a-zA-Z0-9]{8,20}$/;
    this.passwordRegexp = /^([a-zA-Z0-9]|[$%&/()\\=\][{}]){8,}$/;
  }

  /**
   * validate if the pasword is valid
   * @param {String} password
   */
  validatePassword (password) {
    return this.passwordRegexp.test(password);
  }

  /**
   * Validate if the username is valid
   * @param {String} username
   */
  validateUsername (username) {
    return this.usernameRegexp.test(username);
  }

  /**
   * validate if the given is valid
   * @param {String} key
   */
  validateKey (key) {
    const possibleKeys = [
      'space',
      'tab',
      'enter',
      'up',
      'down',
      'f',
      'shift-n',
      'k',
      'm',
      's',
      '0',
    ];
    return possibleKeys.includes(key);
  }
}

export default new Validator();
