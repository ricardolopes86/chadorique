const passport = require("passport");
const mongoose = require("mongoose");
const Auth0Strategy = require('passport-auth0');
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

passport.use(
    new Auth0Strategy({
    domain: keys.auth0Domain,
    clientID: keys.auth0ClientID,
    clientSecret: keys.auth0ClientSecret,
    callbackURL: 'http://localhost:3000/callback'
   },
   function(accessToken, refreshToken, extraParams, profile, done) {
     // accessToken is the token to call Auth0 API (not needed in the most cases)
     // extraParams.id_token has the JSON Web Token
     // profile has all the information from the user
     const socialNetwork = profile.id.substr(0, profile.id.indexOf('|'));
     User.findOne({ $or: [{googleId: profile.id}, {facebookId: profile.id}] }).then(user => {
        if (user) {
          //don't create user
          profile["appid"] = user.id
          done(null, profile);
        } else {
            if (socialNetwork === 'google-oauth2'){
                new User({ googleId: profile.id, displayName: profile.displayName }).save().then(
                  user => {
                    profile["appid"] = user.id
                    done(null, profile);
                  });
            } else {
                new User({ facebookId: profile.id, displayName: profile.displayName }).save().then(
                    user => {
                        profile["appid"] = user.id
                        done(null, profile);
                    });
            }
        }
      });
   }
  ));