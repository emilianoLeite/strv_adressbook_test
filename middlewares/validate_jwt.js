module.exports = (app) => {
  const jwt = require('jsonwebtoken');

  return function (req, res, next) {
    if (req.headers['authorization']) {
      const [bearerString, token] = req.headers['authorization'].split(' ');

      jwt.verify(token, app.get('secret_key'), (err, payload) => {
        if (err) {
          return res.status(401).send({ error: err.message });
        } else {
          req.currentUserId = payload.id;
          next();
        }
      });
    } else {
      res.status(401).send({ error: 'Invalid token' })
    }
  }
};