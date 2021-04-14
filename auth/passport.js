const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const Models = require('../models/users');

const Users = Models.User;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy(
    {
      usernameField: 'Username',
      passwordField: 'Password',
    },
    (username, password, callback) => {
      Users.findOne({Username: username}, (error, user) => {
        if (error) {
          return callback(error);
        }
        if (!user) {
          return callback(null, false,
              {message: 'Incorrect username or password.'});
        }
        return callback(null, user);
      });
    },
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret_jwt'}, (jwtPayload, callback) => {
  return Users.findById(jwtPayload._id)
      .then((user) => {
        return callback(null, user);
      })
      .catch((error) => {
        return callback(error);
      });
}));


