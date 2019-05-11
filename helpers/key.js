import Validator from './validator';

class KeyHandler {
  constructor () {
    // this.url = 'http://localhost:9000/keys';
    this.url = `http://${process.env.HOST}:${process.env.PORT}/keys`;
  }

  sendKey (key) {
    console.log(Validator.validateKey(key));
    console.log(this.url);
    if (Validator.validateKey(key)) {
      fetch(`${this.url}/sendKey`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });
    }
  }
}

export default new KeyHandler();
