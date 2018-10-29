require('dotenv').config();
const logger = require('morgan');

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const mongoose = require('mongoose');

module.exports = function (app) {
  switch (process.env.NODE_ENV) {
    case 'test':
      mongoose.connect('mongodb://localhost/test');
      break;

    case 'production':
      mongoose.connect(process.env.MONGODB_URI);
      app.use(logger('short'));
      break;

    default:
      mongoose.connect(process.env.MONGODB_URI);
      app.use(logger('dev'));
      break;
  }

  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID
  };
  firebase.initializeApp(config);

  const firestore = firebase.firestore();
  // Disable deprecated features
  firestore.settings({
    timestampsInSnapshots: true
  });

  app.set('firestore', firestore);
}