/**
 * User model
 * @module usersmodel
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// eslint-disable-next-line new-cap
const userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}],
});

/**
 * Function that encrypts password.
 * @method encryptpassword
 * @param {string} password.
 * @return encrypted password.
 */

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.Password;
  return obj;
};

/**
 * Function that validates password
 * @method validatepassword
 * @param {string} password
 * @return password
 */

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};

const User = mongoose.model('User', userSchema);

module.exports.User = User;
