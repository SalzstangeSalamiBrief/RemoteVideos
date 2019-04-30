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
    if (!this.passwordRegexp.test(password)) {
      return false;
    }
    return true;
  }

  /**
   * Validate if the username is valid
   * @param {String} username
   */
  validateUsername (username) {
    if (!this.usernameRegexp.test(username)) {
      return false;
    }
    return true;
  }
}

export default new Validator();
