# strv_adressbook_test

[![Build Status](https://travis-ci.org/emilianoLeite/strv_adressbook_test.svg?branch=master)](https://travis-ci.org/emilianoLeite/strv_adressbook_test)

# Installation
1. `git clone` this repo
2. `cd` into the cloned folder
3. run `npm install`
4. Create a `.env` file at the root folder and set up the following ENV VARIABLES:

  (_The FIREBASE\_* variables can be obtained accessing your project from the [firebase console](https://console.firebase.google.com)_)
  ```
  FIREBASE_API_KEY # from the firebase console
  FIREBASE_AUTH_DOMAIN # from the firebase console
  FIREBASE_DATABASE_URL # from the firebase console
  FIREBASE_PROJECT_ID # from the firebase console
  FIREBASE_STORAGE_BUCKET # from the firebase console
  FIREBASE_SENDER_ID # from the firebase console
  MONGODB_URI # mongodb uri for connecting into your mongodb instance
  SECRET_KEY # key used to generate JWT tokens
  ```
5. start a mongo instance: `mongod`
6. run `npm test` to ensure all tests are green
7. running `npm start` will start the server at `localhost:3000`

# Usage

## `POST /sign_up`
Use this endpoint to register new users.

### Params
1. email - String - required
2. password - String - required

### Response
#### Success
- `HTTP 201 + Success message`

#### Failure
- `HTTP 422 + Error messages`

## `POST /sign_in`
Use this endpoint to login a registered user.

### Params
1. email - String - required
2. password - String - required

### Response
#### Success
- `HTTP 200 + JWT token to be used on authenticated requests`

#### Failure
- `HTTP 422 + Error messages`

## `POST /contacts`
Use this endpoint to create a new contact for a signed in user.

### Headers
- `Authorization - Bearer <JWT token>` - required

### Params
All params are optional, but at least **one** is required in order to create a contact
1. name - String - optional
2. phone - String - optional
3. email - String - optional
4. address - Object - optional
    1. street - String - optional
    2. number - String - optional
    3. zipcode - String - optional

### Response
#### Success
- `HTTP 201 + Created contact data`

#### Failure
- `HTTP 422 + Error messages`

# Deploy
1. In the terminal, set the `heroku` remote:

```bash
git remote add heroku https://git.heroku.com/strv-adressbook-test.git
```

2. Add the following variables in the [project's settings](https://dashboard.heroku.com/apps/strv-adressbook-test/settings):

  (_The FIREBASE\_* variables can be obtained accessing your project from the [firebase console](https://console.firebase.google.com)_)
  ```
  FIREBASE_API_KEY # from the firebase console
  FIREBASE_AUTH_DOMAIN # from the firebase console
  FIREBASE_DATABASE_URL # from the firebase console
  FIREBASE_PROJECT_ID # from the firebase console
  FIREBASE_STORAGE_BUCKET # from the firebase console
  FIREBASE_SENDER_ID # from the firebase console
  MONGODB_URI # mongodb uri for connecting into your mongodb instance
  SECRET_KEY # key used to generate JWT tokens
  ```

3. Push the latest changes:

```bash
git push heroku master
```