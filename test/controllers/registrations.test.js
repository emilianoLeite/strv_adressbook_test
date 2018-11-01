
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai')
  , config = require('./config')
  , mockApp = config.mockApp
  , chaiHttp = require('chai-http')
  , should = chai.should()
  , registrationsController = require('../../controllers/registrations');
registrationsController(config.mockApp);

chai.use(chaiHttp);

afterEach(() => {
  mockApp.get('dbConnection').model('User').deleteMany({}, () => { });
});

describe('POST sign_up/', () => {
  describe('when not sending an email or password', () => {
    it('should return HTTP 422 with an error message', (done) => {
      chai.request(mockApp)
        .post('/sign_up')
        .send({ 'email': 'email@email.com' })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.eql('You must supply an email and password');
          done();
        });

    });
  });

  describe('when sending all required params', () => {
    describe('but sending invalid data', () => {
      it('should return HTTP 422', (done) => {
        chai.request(mockApp)
        .post('/sign_up')
        .send({ 'email': 'invalid_email', password: '2134' })
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });

      })
    });

    describe('and sending all valid data', () => {
      it('should return HTTP 201 with a success message', (done) => {
        chai.request(mockApp)
          .post('/sign_up')
          .send({ email: 'valid@email.com', password: '2134' })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.data.should.eql('Sign Up successful!')
            done();
          });

      })
    });
  });
});

describe('POST sign_in/', () => {
  describe('when not sending an email or password', () => {
    it('should return HTTP 422 with an error message', (done) => {
      chai.request(mockApp)
        .post('/sign_in')
        .send({ 'email': 'email@email.com' })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.eql('You must supply an email and password');
          done();
        });
    });
  });

  describe('when sending all required params', () => {
    describe('but the user does not exist', () => {
      it('returns HTTP 422 with an error message', (done) => {
        chai.request(mockApp)
          .post('/sign_in')
          .send({ email: 'email@email.com', password: '1234' })
          .end((err, res) => {
            res.should.have.status(422);
            res.body.error.should.eql('Invalid Credentials');
            done();
          });
      });
    });

    describe('but the wrong credentials', () => {
      let userCreated;

      beforeEach(() => {
        userCreated = new Promise((resolve) => {
          chai.request(mockApp)
          .post('/sign_up')
          .send({ email: 'valid@email.com', password: '1234' })
          .end((err, res) => { resolve() });
        });
      });

      it('returns HTTP 422 with an error message', (done) => {
        userCreated.then(() => {
          chai.request(mockApp)
          .post('/sign_in')
          .send({ email: 'valid@email.com', password: 'wrong_password' })
          .end((err, res) => {
            res.should.have.status(422);
            res.body.error.should.eql('Invalid Credentials');
            done();
          });
        });
      });
    });

    describe('and the correct credentials', () => {
      let userCreated;

      beforeEach(() => {
        userCreated = new Promise((resolve) => {
          chai.request(mockApp)
            .post('/sign_up')
            .send({ email: 'valid@email.com', password: '1234' })
            .end((err, res) => { resolve() });
        });
      });

      it('returns HTTP 200 and the generated JWT token', (done) => {
        userCreated.then(() => {
          chai.request(mockApp)
            .post('/sign_in')
            .send({ email: 'valid@email.com', password: '1234' })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.data.length.should.eql(171);
              done();
            });
        });
      });
    });
  });
});
