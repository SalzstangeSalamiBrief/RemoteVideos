const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const logger = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const CorsOptions = require('./config/CorsConfig');

const RouteUser = require('./controller/User.js');
const RouteKeyHandler = require('./controller/Key.js');

const app = express();

require('dotenv').config();
// TODO ENV FILE AND SET IN EVERY FILE THE PORT WITH THE PORT IN THE FILÖE
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 9000;
console.log(process.env.HOST);

app.set('port', port);

mongoose
  .connect(
    'mongodb://localhost/RemoteVideos',
    { useNewUrlParser: true, useCreateIndex: true },
  )
  .then(() => console.log('connected to MongoDB'))
  .catch(e => console.log(e));

// Give nuxt middleware to express

app.use(logger('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Listen the server
app.listen(port, host);

app.use('/users', cors(CorsOptions), RouteUser);
app.use('/keys', cors(CorsOptions), RouteKeyHandler);

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');

config.dev = !(process.env.NODE_ENV === 'production');

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);
  app.use(nuxt.render);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}
start();
