const Parameters = require('strong-params').Parameters

module.exports = (app) => {
  return {
    create: (contactData) => {
      return new Promise((resolve, reject) => {
        const params = Parameters(contactData);

        const permittedParams = params.permit(
          'name', 'phone', 'email', { address: ['street', 'number', 'zipcode'] }
        ).value();

        app.get('db').collection("contacts")
          .add(permittedParams)
          .then((docRef) => resolve({ id: docRef.id, ...permittedParams }))
          .catch(reject);
      });
    }
  }
};