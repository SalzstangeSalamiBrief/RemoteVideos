const express = require('express');
const fs = require('fs');
const path = require('path');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const logger = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const CorsOptions = require('./config/CorsConfig');

const UserRouter = require('./resources/user/user.router');
const KeyHandlerRouter = require('./resources/key/key.router');

const { auth } = require('./middleware/auth');

const app = express();

require('dotenv').config();

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 9000;
console.log(process.env.HOST);

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, './private/logs/', 'requestLogs.log'),
  { flags: 'a' },
);

app.set('port', port);

mongoose
  .connect(
    'mongodb://localhost/RemoteVideos',
    { useNewUrlParser: true, useCreateIndex: true },
  )
  .then(() => console.log('connected to MongoDB'))
  .catch(e => console.log(e));

// Give nuxt middleware to express

app.use(logger('combined', { stream: accessLogStream }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Listen the server
app.listen(port, host);

app.use('/users', cors(CorsOptions), UserRouter);
app.use('/keys', cors(CorsOptions), auth, KeyHandlerRouter);

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
