const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    validate: {
      validator: function validEmail(v) {
        return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v)
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;