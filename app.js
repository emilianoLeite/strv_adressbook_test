const express = require('express');
const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(express.json());

config(app);
routes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening at ${port}...`);
});
