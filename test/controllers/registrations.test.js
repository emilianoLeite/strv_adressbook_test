
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

beforeEach(() => {
  mockApp.get('dbConnection').deleteModel(/.+/);
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
      it.skip('should return HTTP 201 with a success message', (done) => {
        chai.request(mockApp)
          .post('/sign_up')
          .send({ email: 'valid@email.com', password: '2134' })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.data.should.eql('Sign up successful!')
            done();
          });

      })
    });
  });
});
