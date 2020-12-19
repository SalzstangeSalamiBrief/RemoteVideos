/**
 * Class for the login and logout feature
 */
import Validator from './validator';
import JWTStorage from './JWTStorage';

class Login {
  constructor () {
    this.loginURL = `http://${process.env.HOST}:${process.env.PORT_BACKEND}/users`;
  }

  /**
   * check if the jwt is valid
   * @param {String} username
   */
  // async checkKey (username, token) {
  async checkKey (username, token) {
    if (username && token) {
      try {
        const response = await fetch(`${this.loginURL}/checkToken`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username,
          }),
        });
        return response.status === 202;
      } catch (err) {
        return false;
      }
    }
    return false;
  }

  async postKey (username, password, token) {
    const areCredentialsValid = username && token && password;
    if (areCredentialsValid) {
      try {
        const response = await fetch(`${this.loginURL}/checkToken`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
        return response.status === 202;
      } catch (err) {
        return false;
      }
    }
    return false;
  }

  /**
   * Return a jwt-token, if the given credetials are correct.
   * @param {String} username
   * @param {String} password
   */
  async login (username = '', password = '') {
    const areParamsValid = Validator.validateUsername(username) && Validator.validatePassword(password);
    if (areParamsValid) {
      try {
        const response = await fetch(`${this.loginURL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        if (response.status !== 202) {
          return { error: 'Invalid Credentials' };
        }
        const { token } = await response.json();
        JWTStorage.setAuthToken(token, username);
        return { token };
      } catch (err) {
        console.log(err);
      }
    }
    return false;
  }

  logout () {
    return this.loginURL;
  }
}

export default new Login();
