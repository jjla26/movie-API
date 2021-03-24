const express = require('express');
const movies = require('./data/movies');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to the Movie API');
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
