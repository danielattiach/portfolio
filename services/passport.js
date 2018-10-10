const passport = require('passport');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser( async (id, done) => {
  const newUser = await User.findById(id)
  done(null, newUser);
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, async (accessToken, refreshToken, profile, done) => {

  const user = await User.findOne({ googleID: profile.id});

  if (user) {
    done(null, user);
  } else {
    const newUser = await new User({
      loginType: 'google',
      googleID: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value
    }).save();
    done(null, newUser);
  }

}));

passport.use(new GitHubStrategy({
  clientID: keys.githubClientID,
  clientSecret: keys.githubClientSecret,
  callbackURL: "/auth/github/callback",
  proxy: true
}, async (accessToken, refreshToken, profile, done) => {

  console.log("profile ID: ", profile.id);
  console.log("display name: ", profile.displayName);
  console.log("profile url: ", profile.profileUrl);
  console.log("avatar: ", profile._json.avatar_url);

  const user = await User.findOne({ githubID: profile.id});

  if (user) {
    done(null, user);
  } else {
    const newUser = await new User({
      loginType: 'github',
      githubID: profile.id,
      name: profile.displayName,
      githubPage: profile.profileUrl,
      avatar: profile._json.avatar_url
    }).save();
    done(null, newUser);
  }
}
));
