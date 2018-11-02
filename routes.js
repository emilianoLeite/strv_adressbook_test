module.exports = (app) => {
  const contactsController = require('./controllers/contacts');
  const registrationsController = require('./controllers/registrations');

  contactsController(app);
  registrationsController(app);
};