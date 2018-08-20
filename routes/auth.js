const express = require("express");
const Auth0Strategy = require("passport-auth0"),  passport = require("passport");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn();

module.exports = app => {
  // Perform the login, after login Auth0 will redirect to callback
  app.get(
    "/login",
    passport.authenticate("auth0", { scope: "openid email profile" }),
    function(req, res) {
      res.redirect("/");
    }
  );

  // Perform the final stage of authentication and redirect to '/user'
  app.get(
    "/callback",
    passport.authenticate("auth0", { failureRedirect: "/login" }),
    function(req, res) {
      if (!req.user) {
        throw new Error("user null");
      }
      res.redirect("/");
    }
  );

  /* GET user profile. */
  app.get("/user", ensureLoggedIn, function(req, res, next) {
    res.render("pages/user", {
      user: req.user,
      userProfile: JSON.stringify(req.user, null, "  ")
    });
  });

  // Perform session logout and redirect to homepage
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
// const passport = require("passport");

// module.exports = app => {
//   app.get(
//     "/auth/google",
//     passport.authenticate("google", {
//       scope: ["profile", "email"],
//       failureRedirect: "/entrar"
//     })
//   );

//   app.get(
//     "/auth/google/callback",
//     passport.authenticate("google", {
//       successRedirect: "/",
//       failureRedirect: "/entrar"
//     })
//   );

//   app.get("/auth/facebook", passport.authenticate("facebook"));

//   app.get("/auth/facebook/callback", passport.authenticate("facebook"));

//   app.get("/logout", (req, res) => {
//     req.logout();
//     res.send(req.user);
//   });
// };
