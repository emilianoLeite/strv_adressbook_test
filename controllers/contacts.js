module.exports = function (app) {
  const contacts = require('../services/contacts')(app);
  const validateJWT = require('../middlewares/validate_jwt')(app);

  app.use('/contacts*', validateJWT);


  app.post('/contacts', (req, res) => {
    const requestData = req.body;
    contacts.create({ ...requestData, userId: req.currentUserId })
      .then((data) => res.status(201).send({ data }))
      .catch((error) => res.status(422).send({ error }));
  });
};