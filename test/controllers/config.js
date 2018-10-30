const mongoose = require('mongoose')
const express = require('express');
const mockApp = express();

mockApp.use(express.json());
const port = process.env.PORT || 3000;
mockApp.listen(port, () => {});

const dbConnection = mongoose.createConnection('mongodb://localhost/test');

mockApp.set('dbConnection', dbConnection);

mockApp.set('secret_key', 'test_secret_key');

module.exports = {
  mockApp
};