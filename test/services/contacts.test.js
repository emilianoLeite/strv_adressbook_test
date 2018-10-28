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
  describe('when the firebase document creation is successful', () => {

    beforeEach(() => {
      const mockApp = chai.spy.interface({
        get(key) {
          return {
            collection: (collectionName) => {
              return {
                add: () => {
                  return Promise.resolve({ id: 'Document ID' } )
                }
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
