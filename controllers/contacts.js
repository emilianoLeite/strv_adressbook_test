module.exports = function (app) {
  const contacts = require('../services/contacts')(app);

  // create
  app.post('/contacts', (req, res) => {
    const requestData = req.body;

    contacts.create(requestData)
      .then((data) => res.status(201).send({ data }))
      .catch((error) => res.status(422).send({ error }));
  });
};