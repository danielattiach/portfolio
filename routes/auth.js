const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google'));

router.get('/github', passport.authenticate('github', {
  scope: [ 'user:email' ]
}));

router.get('/github/callback', passport.authenticate('github'))

router.get('/current', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.send({ logInOut: 'logged out' });
});

module.exports = router;
