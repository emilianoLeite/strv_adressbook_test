const express = require('express');
const config = require('./config');
const app = express();

app.use(express.json());

config(app);

app.get('/', (request, response) => {
  response.send('Hello World').status(200);
});

app.listen(3000, () => {
  console.log('listening at 3000...');
});
