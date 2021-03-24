const express = require('express');

const app = express();

const movies = [
  {
    name: 'American Ganster',
    description: 'An outcast New York City cop is charged with ' +
      'bringing down Harlem drug lord Frank Lucas, whose real ' +
      'life inspired this partly biographical film.',
  },
  {
    name: 'Money Ball',
    description: 'Frustrated that his baseball team can\'t afford big-money ' +
      'players, Oakland A\'s general manager Billy Beane bets on a bold new ' +
      'strategy to change the game.',
  },
  {
    name: 'The Wolf of Wall Street',
    description: 'Audacious, risk-taking Wall Street stockbroker Jordan ' +
      'Belfort amasses wealth with his brash, drug-fueled attitude -- ' +
      'drawing the attention of the FBI.',
  },
  {
    name: 'Jack Reacher',
    description: 'When an ex-military cop investigates a sniper charged ' +
      'with five homicides, he\'s drawn into a dangerous cat-and-mouse game ' +
      'in this exciting thriller.',
  },
  {
    name: 'Limitless',
    description: 'A desperate writer in a downward spiral. A mysterious drug ' +
      'that changes everything. But how long can it last?',
  },
  {
    name: 'Catch me if you can',
    description: 'An FBI agent makes it his mission to put cunning con man ' +
      'Frank Abagnale Jr. behind bars. But Frank not only eludes capture, ' +
      'he revels in the pursuit.',
  },
  {
    name: 'Captain Phillips',
    description: 'Four Somali pirates hijack a cargo ship and hold the '+
      'captain hostage, setting the stage for an explosive confrontation ' +
      'with the U.S. Navy.',
  },
  {
    name: 'Deadpool',
    description: 'When a failed experiment leaves a mercenary with ' +
      'supernatural healing powers, he creates a new identity to track ' +
      'down the man who wrecked his life.',
  },
  {
    name: 'John Wick',
    description: 'When a gangster\'s son steals his car and kills his dog, ' +
      'fearless ex-hit man John Wick takes on the entire mob ' +
      'to get his revenge.',
  },
  {
    name: 'Operation Finale',
    description: 'In 1960, Israeli spies undertake a daring '+
      'mission to capture notorious Nazi war criminal Adolf Eichmann and '+
      'bring him to justice. Based on real events.',
  },
];

app.get('/', (req, res) => {
  res.send('Welcome to the Movie API');
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
