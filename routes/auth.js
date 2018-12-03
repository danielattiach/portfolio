const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google'), (req, res) => { res.redirect('/')});

router.get('/github', passport.authenticate('github', {
  scope: [ 'user:email' ]
}));

router.get('/github/callback', passport.authenticate('github'), (req, res) => { res.redirect('/')})

router.get('/current', (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send({fail: "404"});
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
