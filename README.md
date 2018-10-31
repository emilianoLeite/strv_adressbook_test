# strv_adressbook_test

[![Build Status](https://travis-ci.org/emilianoLeite/strv_adressbook_test.svg?branch=master)](https://travis-ci.org/emilianoLeite/strv_adressbook_test)

# Installation
1. `git clone` this repo
2. `cd` into the cloned folder
3. run `npm install`
4. Set up the ENV VARIABLES:
  ```
  FIREBASE_API_KEY
  FIREBASE_AUTH_DOMAIN
  FIREBASE_DATABASE_URL
  FIREBASE_PROJECT_ID
  FIREBASE_STORAGE_BUCKET
  FIREBASE_SENDER_ID
  MONGODB_URI
  SECRET_KEY
  ```

5. run `npm test` to ensure all tests are green
6. running `npm start` will start the server at `localhost:3000`

# Usage

## POST /sign_up
Use this endpoint to register new users.

### Params
1. email - String - required
2. password - String - required

### Response
Success message

## POST /sign_in
Use this endpoint to login a registered user.

### Params
1. email - String - required
2. password - String - required

### Response
JWT token to be used on authenticated requests

## POST /contacts
Use this endpoint to create a new contact for a signed in user.

### Params
1. email - String - required
2. password - String - required

### Response
Success message