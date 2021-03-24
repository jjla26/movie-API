const express = require('express');
const morgan = require('morgan');
const movies = require('./data/movies');

const app = express();

app.use(express.static('public'));
app.use(morgan('common'));

// Route for the root url
app.get('/', (req, res) => {
  res.send('Welcome to the Movie API');
});

// Route for movies pathname returns movies data
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Server listener
app.listen(8080, () => {
  console.log('Server running on port 8080');
});
