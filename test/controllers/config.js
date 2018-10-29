const mongoose = require('mongoose')
const express = require('express');
const mockApp = express();

mockApp.use(express.json());
const port = process.env.PORT || 3000;
mockApp.listen(port, () => {});

module.exports = {
  dbConn: mongoose.createConnection('mongodb://localhost/test'),
  mockApp
};