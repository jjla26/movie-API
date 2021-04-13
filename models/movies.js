const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
  ImagePath: String,
  Featured: Boolean,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports.Movie = Movie;
