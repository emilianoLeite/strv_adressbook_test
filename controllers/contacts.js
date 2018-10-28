module.exports = function (app) {
  const contacts = require('../services/contacts')(app);

  // create
  app.post('/contacts', (request, response) => {
    const requestData = request.body;

    contacts.create(requestData)
      .then((data) => response.status(201).send({ data }))
      .catch((error) => response.status(422).send({ error }));
  });
};