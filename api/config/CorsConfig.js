// Array for whitelisted URLs
const whitelist = ['http://localhost:9000', 'http://192.168.178.30:9000'];

/**
 * calculate if the header of the request needs cors enabled
 * @param {request} req
 * @param {function} callback
 */
function calcCorsOptions (req, callback) {
  const corsOptions = { origin: false };
  if (whitelist.includes(req.header('Origin'))) {
    corsOptions.origin = true;
  }
  callback(null, corsOptions);
}

module.exports = calcCorsOptions;
