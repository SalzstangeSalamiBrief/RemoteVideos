const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const CorsOptions = require('./config/CorsConfig');

const UserRouter = require('./routes/user.router');
const KeyHandlerRouter = require('./routes/key.router');

const { auth } = require('./middleware/auth');

const app = express();

require('dotenv').config();

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT_BACKEND || 9000;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, './private/logs/', 'requestLogs.log'),
  { flags: 'a' },
);

app.set('port', port);
// connect to db
mongoose
  .connect(
    'mongodb://localhost/RemoteVideos',
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  )
  .then(() => console.log('connected to MongoDB'))
  .catch((e) => console.log(e));
// add middleware
app.use(logger('combined', { stream: accessLogStream }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(CorsOptions));
// Listen the server
app.listen(port, host);
// add routed
app.use('/users', UserRouter);
app.use('/keys', auth, KeyHandlerRouter);

// Export express app
module.exports = app;

// Start standalone server if directly running
if (require.main === module) {
  app.listen(port, host, () => {
    console.log(`API server listening on http://${host}:${port}`);
  });
}
