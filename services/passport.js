const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //don't create user
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id, name: profile.displayName }).save().then(user => {
            done(null, user);
          });
        }
      });
    }
  )
);

// passport.use(
//     new FacebookStrategy({
//     clientID: keys.facebookClientID,
//     clientSecret: keys.facebookClientSecret,
//     callbackURL: "/auth/facebook/callback"
//     //profileFields: ['id', 'displayName', 'email']
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOne({ facebookId: profile.id, name: profile.displayName }).then(existingUser => {
//         if (existingUser) {
//           //don't create user
//           done(null, existingUser);
//         } else {
//           new User({ facebookId: profile.id }).save().then(user => {
//             done(null, user);
//           });
//         }
//       });
//   }
// ));