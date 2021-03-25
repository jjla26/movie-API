const express = require('express');
const morgan = require('morgan');
const movies = require('./data/movies');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.static('public'));
app.use(morgan('common'));

// Error handler
app.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
});

// Route for the root url
app.get('/', (req, res) => {
  return res.json('Welcome to the Movie API');
});

// Route for movies pathname returns movies data
app.get('/movies', (req, res) => {
  return res.json(movies);
});

const port = process.env.PORT || 8080;

// Server listener
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
