const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const UserScheme = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean },
});

UserScheme.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.get('jwtPrivatekey')
  );
};

const User = mongoose.model('User', UserScheme);

module.exports = User;
