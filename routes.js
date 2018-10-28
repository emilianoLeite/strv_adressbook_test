module.exports = (app) => {
  const contactsController = require('./controllers/contacts');

  app.get('/', (request, response) => {
    response.sendStatus(200);
  });

  contactsController(app);
};