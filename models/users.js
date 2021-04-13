const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}],
});

const User = mongoose.model('User', userSchema);

module.exports.User = User;
