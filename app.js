const express = require('express');
const logger = require('morgan');

const app = express();

app.use(express.json());
app.use(logger('dev'));

app.get('/', (request, response) => {
  response.send('Hello World').status(200);
});

app.listen(3000, () => {
  console.log('listening at 3000...');
});
