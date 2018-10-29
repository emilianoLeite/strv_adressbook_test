module.exports = function (app) {
  const User = require('../models/user');
  const bcrypt = require('bcrypt');

  app.post('/sign_up', (req, res) => {
    const { email, password } = req.body;

    if (email == null || password == null) {
      return res.status(422).send({ error: 'You must supply an email and password' });
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
    bcrypt.hash(password, saltRounds)
      .then((hash) => new User({ email, password: hash }))
      .then((user) => user.save())
      .then((user) => {
        res.status(201).send({ data: 'Sign Up successful!' });
      })
      .catch((error) => res.status(422).send({ error }));
  });

};