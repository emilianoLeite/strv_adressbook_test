//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai')
, should = chai.should()
, spies = require('chai-spies')
, chaiAsPromised = require("chai-as-promised");

const contactsService = require('../../services/contacts');

chai.use(spies);
chai.use(chaiAsPromised);

let contacts;

describe('#create', () => {
  describe('when sending some data', () => {
    describe('when the firebase document creation is successful', () => {
      const firebaseAddSpy = chai.spy(
        returns => Promise.resolve({ id: 'Document ID' })
      );

      beforeEach(() => {
        const mockApp = chai.spy.interface({
          get(key) {
            return {
              collection: (collectionName) => {
                return {
                  add: firebaseAddSpy
                }
              }
            }
          }
        });
        contacts = contactsService(mockApp);
      });

      it('returns the fields of the created document', (done) => {
        contacts.create({ name: 'Contact Name', email: 'abc@email.com' }).should
          .eventually
          .eql({
            id: 'Document ID',
            name: 'Contact Name',
            email: 'abc@email.com',
          })
          .notify(done);
      });

      it('adds the userId when creating the contact', (done) => {
        contacts.create({
          name: 'Contact Name', email: 'abc@email.com', userId: '1234'
        }).should.eventually.be.fulfilled;

        firebaseAddSpy.should.have.been.called.with({
          name: 'Contact Name', email: 'abc@email.com', userId: '1234'
        });

        done();
      });
    });

    describe('when the firebase document creation is not successful', () => {
      beforeEach(() => {
        const mockApp = chai.spy.interface({
          get(key) {
            return {
              collection: (collectionName) => {
                return {
                  add: () => Promise.reject('Unknown error')
                }
              }
            }
          }
        });

        contacts = contactsService(mockApp);
      });

      it('propagates the rejected promise', (done) => {
        contacts.create({ name: 'Contact Name', email: 'abc@email.com' }).should
          .eventually
          .be.rejectedWith('Unknown error')
          .notify(done);
      });
    });
  });

  describe('when sending no data', () => {
    const mockApp = chai.spy.interface({
      get(key) {
        return {
          collection: (collectionName) => {
            return {
              add: () => {
                return Promise.resolve({ id: 'Document ID' })
              }
            }
          }
        }
      }
    });

    beforeEach(() => {
      contacts = contactsService(mockApp);
    });

    it('returns an error message', (done) => {
      contacts.create({}).should
        .eventually
        .be.rejectedWith('Contact info cannot be blank')
        .notify(done);
    });

    it('does not try to save data into firebase', (done) => {
      contacts.create({}).should
        .eventually
        .be.rejected

      mockApp.get.should.not.have.been.called();

      done();
    });
  });

  describe('when only sending the userId', () => {
    const mockApp = chai.spy.interface({
      get(key) {
        return {
          collection: (collectionName) => {
            return {
              add: () => {
                return Promise.resolve({ id: 'Document ID' })
              }
            }
          }
        }
      }
    });

    beforeEach(() => {
      contacts = contactsService(mockApp);
    });

    it('returns an error message', (done) => {
      contacts.create({ userId: '1234' }).should
        .eventually
        .be.rejectedWith('Contact info cannot be blank')
        .notify(done);
    });

    it('does not try to save data into firebase', (done) => {
      contacts.create({ userId: '1234' }).should
        .eventually
        .be.rejected

      mockApp.get.should.not.have.been.called();

      done();
    });
  });
});
