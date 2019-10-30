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
    if (password) {
      if (!this.passwordRegexp.test(password)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Validate if the username is valid
   * @param {String} username
   */
  validateUsername (username) {
    if (username) {
      if (!this.usernameRegexp.test(username)) {
        return false;
      }
    }
    return true;
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
    ];
    return possibleKeys.includes(key);
  }
}

export default new Validator();
