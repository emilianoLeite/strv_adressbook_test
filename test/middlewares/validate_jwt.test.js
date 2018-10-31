//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mockApp = require('express')();
const secretKey = 'test_secret_key';
mockApp.set('secret_key', secretKey);

const validateJWT = require('../../middlewares/validate_jwt')(mockApp);
const chai = require('chai')
  , should = chai.should()
  , chaiHttp = require('chai-http')
  , spies = require('chai-spies')
  , jwt = require('jsonwebtoken')

chai.use(chaiHttp);
chai.use(spies);

let nextHandlerSpy = chai.spy();

describe('MIDDLEWARE: validateJWT', () => {
  describe('when the user supplies a valid token', () => {
    let validToken;

    beforeEach(() => {
      validToken = jwt.sign({ id: '1' }, mockApp.get('secret_key'));

      const fakeHandler = (req, res) => {
        req.currentUserId.should.eql('1');
        res.sendStatus(200);
      }

      nextHandlerSpy = chai.spy(fakeHandler);
      mockApp.get('/mock_route1', validateJWT, nextHandlerSpy);
    });

    it('should call the next handler', (done) => {
      chai.request(mockApp)
        .get('/mock_route1').set('Authorization', `Bearer ${validToken}`)
        .end((err, res) => {
          nextHandlerSpy.should.have.been.called();
          done();
        });
    });

    it('should save the currentUserId in the request object', (done) => {
      chai.request(mockApp)
        .get('/mock_route1').set('Authorization', `Bearer ${validToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          // currentUser expectation is inside fakeHandler
          done();
        });
    });
  });

  describe('when the user supplies an invalid token', () => {
    beforeEach(() => {
      mockApp.get('/mock_route2', validateJWT, nextHandlerSpy);
    });

    it('should return HTTP 401', (done) => {
      chai.request(mockApp)
        .get('/mock_route2').set('Authorization', 'Bearer Invalid token')
        .end((err, res) => {
          res.should.have.status(401);
          nextHandlerSpy.should.not.have.been.called();
          done();
        });
    });
  });

  describe('when the user does not supply a token', () => {
    beforeEach(() => {
      mockApp.get('/mock_route3', validateJWT, nextHandlerSpy);
    });

    it('should return HTTP 401', (done) => {
      chai.request(mockApp)
        .get('/mock_route3')
        .end((err, res) => {
          res.should.have.status(401);
          nextHandlerSpy.should.not.have.been.called();
          done();
        });
    });
  });
});