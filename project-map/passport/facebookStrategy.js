const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");

passport.use(
  new FacebookStrategy(
    {
      clientID: "199543470650397",
      clientSecret: "2a7bb5aafa6ff9bd2717618b3a1e2e0b",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id })
        .then(user => {
          if (user) return done(null, user);
          User.create({
            facebookId: profile.id,
            displayName: profile.displayName
          }).then(newUser => {
            done(null, newUser);
          });
        })
        .catch(err => {
          done(err);
        });
    }
  )
);
