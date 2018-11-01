module.exports = function (app) {
  const User = require('../models/user')(app.get('dbConnection'));
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');


  app.post('/sign_up', (req, res) => {
    const { email, password } = req.body;

    if (email == null || password == null) {
      return res.status(422).send({ error: 'You must supply an email and password' });
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
    bcrypt.hash(password, saltRounds)
      .then((hash) => new User({ email, password: hash }))
      .then((user) => Promise.resolve(user.save()))
      .then((user) => {
        res.status(201).send({ data: 'Sign Up successful!' });
      })
      .catch((error) => res.status(422).send({ error }));
  });

  app.post('/sign_in', (req, res) => {
    const { email, password } = req.body;

    if (email == null || password == null) {
      return res.status(422).send({ error: 'You must supply an email and password' });
    }

    User.findOne({ email }).exec()
      .then((user) => {
        if (user == null) {
          throw 'Invalid Credentials';
        }
        return user;
      })
      .then((user) => Promise.all([user.id, bcrypt.compare(password, user.password)]))
      .then(([userId, passwordsMatch]) => {
        if (!passwordsMatch) {
          throw 'Invalid Credentials';
        }
        return userId;
      })
      .then((userId) => {
        return Promise.resolve(jwt.sign(
          { id: userId },
          app.get('secret_key'),
          { expiresIn: '1h' }
        ));
      })
      .then((jwt) => res.send({ data: jwt }))
      .catch(error => res.status(422).send({ error }));
  });
};