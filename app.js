const express = require('express');
const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(express.json());

config(app);
routes(app);

app.listen(3000, () => {
  console.log('listening at 3000...');
});
