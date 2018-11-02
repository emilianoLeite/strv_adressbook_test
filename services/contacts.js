const Parameters = require('strong-params').Parameters

module.exports = (app) => {
  return {
    create: (contactData) => {
      return new Promise((resolve, reject) => {
        const params = Parameters(contactData);

        const permittedParams = params.permit(
          'name', 'phone', 'email',
          { address: ['street', 'number', 'zipcode'] }
        ).value();

        if (Object.keys(permittedParams).length === 0) {
          return reject('Contact info cannot be blank');
        }

        app.get('firestore').collection("contacts")
          .add({ ...permittedParams, userId: contactData.userId })
          .then((docRef) => resolve({ id: docRef.id, ...permittedParams }))
          .catch(reject);
      });
    }
  }
};