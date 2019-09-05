/**
 * Class for the login and logout feature
 */
import Validator from './validator';
import Cookie from './cookie';

class Login {
  constructor () {
    this.loginURL = `http://${process.env.HOST}:${process.env.PORT}/users`;
  }

  /**
   * check if the jwt is valid
   * @param {String} username
   */
  async checkKey (passedUsername, passedToken) {
    const credentials = { username: '', token: '' };
    if (passedUsername && passedToken) {
      credentials.username = passedUsername;
      credentials.token = passedToken;
    } else {
      try {
        const { token, username } = Cookie.getAuthToken();
        credentials.username = username;
        credentials.token = token;
      } catch (err) {
        console.log(err);
      }
    }
    if (credentials.username !== '' && credentials.token !== '') {
      try {
        const response = await fetch(`${this.loginURL}/check-key`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(credentials),
        });
        if (response.status !== 202) {
          return false;
        }
        return true;
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
    if (!Validator.validateUsername(username)) {
      return false;
    }
    if (!Validator.validatePassword(password)) {
      return false;
    }
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
        return { err: 'Invalid Credentials' };
      }
      const content = await response.json();
      return content;
    } catch (err) {
      console.log(err);
    }
    return {};
  }

  logout () {
    return this.loginURL;
  }
}

export default new Login();
