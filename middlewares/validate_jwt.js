module.exports = (app) => {
  const jwt = require('jsonwebtoken');

  return function (req, res, next) {
    if (req.headers['authorization']) {
      const [bearerString, token] = req.headers['authorization'].split(' ');

      jwt.verify(token, app.get('secret_key'), (err, payload) => {
        if (err) {
          return res.send({ error: err.message }).status(401);
        } else {
          req.currentUser = payload;
          next();
        }
      });
    } else {
      res.send({ error: 'Invalid token' }).status(401);
    }
  }
};