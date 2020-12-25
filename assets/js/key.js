import Validator from './validator';
import JWTStorage from './JWTStorage';

class KeyHandler {
  constructor () {
    // this.url = 'http://localhost:9000/keys';
    this.url = `http://${process.env.HOST}:${process.env.PORT_BACKEND}/keys`;
  }

  async sendKey (key, username) {
    if (Validator.validateKey(key)) {
      const { token } = JWTStorage.getAuthToken();
      try {
        fetch(`${this.url}/sendKey`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            key,
            username,
          }),
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
}

export default new KeyHandler();
