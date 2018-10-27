const logger = require('morgan');

module.exports = function (app) {
  switch (process.env.NODE_ENV) {
    case 'test':
      // don't use a logger
      break;

    case 'production':
      app.use(logger('short'));
      break;

    default:
      app.use(logger('dev'));
      break;
  }
}