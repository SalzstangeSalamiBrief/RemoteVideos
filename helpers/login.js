/**
 * Class for the login and logout feature
 */
import Validator from './validator';

class Login {
  constructor () {
    this.loginURL = 'http://localhost:9000';
  }

  checkKey () {
    return this.loginURL;
  }

  async login (username = '', password = '') {
    if (!Validator.validateUsername(username)) {
      // todo err
      return false;
    }
    if (!Validator.validatePassword(password)) {
      // todo err
      return false;
    }
    const response = await fetch(`${this.loginURL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.status !== 202) {
      return { err: 'Invalid Credentials' };
    }
    const content = await response.json();
    return content;
  }

  logout () {
    return this.loginURL;
  }
}

export default new Login();
