module.exports = (app) => {
  const contactsController = require('./controllers/contacts');
  const registrationsController = require('./controllers/registrations');

  app.get('/', (request, response) => {
    response.sendStatus(200);
  });

  contactsController(app);
  registrationsController(app);
};