module.exports = function (app) {
  const User = require('../models/user');
  const bcrypt = require('bcrypt');

  app.post('/sign_up', (request, response) => {
    const { email, password } = request.body;

    if (email == null || password == null) {
      return response.status(422).send({ error: 'You must supply an email and password' });
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
    bcrypt.hash(password, saltRounds)
      .then((hash) => new User({ email, password: hash }))
      .then((user) => user.save())
      .then((user) => {
        response.status(201).send({ data: 'Sign Up successful!' });
      })
      .catch((error) => response.status(422).send({ error }));
  });

};