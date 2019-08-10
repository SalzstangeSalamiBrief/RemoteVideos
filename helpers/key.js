import Validator from './validator';
import CookieHandler from './cookie';

class KeyHandler {
  constructor () {
    // this.url = 'http://localhost:9000/keys';
    this.url = `http://${process.env.HOST}:${process.env.PORT}/keys`;
  }

  async sendKey (key, username) {
    if (Validator.validateKey(key)) {
      console.log(`${this.url}/sendKey`);
      fetch(`${this.url}/sendKey`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key,
          username,
          token: CookieHandler.getAuthToken(),
        }),
      });
    }
  }
}

export default new KeyHandler();
