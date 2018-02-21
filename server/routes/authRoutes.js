const express = require('express');
const router = express.Router();
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');
const Session = require('../models/session');

/// Signup route
router.post('/api/user', (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    //insert into database
    const user = new User({ username: username, email: email, password: hash });
    user
      .save()
      .then(savedUser => {
        req.login(user, error => {
          return res.send(savedUser);
        });
      })
      .catch(next);
  });
});

///testing
router.get('/users/:id', (req, res, next) => {
  console.log('inside users route');
});
////

/// Login route
router.post('/api/session', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(422).json(err);
    if (!user) return res.status(404).json('Invalid login credentials');
    req.login(user, error => {
      if (error) {
        return next(error);
      }
      console.log(user);
      console.log('SessionID', req.sessionID);
      console.log('Session id', req.session.id);
      User.findById(user.id, function(err2, userInstance) {
        userInstance.sessionToken = 'sdhfohfkjsdhfklsdhf';
        userInstance.save();
        return res.send(userInstance);
      });
    });
  })(req, res, next);
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  User.findById(user.id, function(err, aUser) {
    done(err, aUser);
  });
});

//testing
router.get('/', (req, res, next) => {
  res.send('hi');
});

// Logout route
router.get('/api/logout', (req, res, next) => {
  res.clearCookie('connect.sid', { path: '/' });
  Session.findById(req.sessionID, function(err, dbSession) {
    if (err) throw err;
    dbSession.remove();
    res.send(dbSession);
  });
});

//this part allows us to check if user is logged in
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(404).json('Please login first');
  }
}
///

module.exports = router;
