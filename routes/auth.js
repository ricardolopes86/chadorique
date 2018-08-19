const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      failureRedirect: "/entrar"
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/entrar"
    })
  );

  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get("/auth/facebook/callback", passport.authenticate("facebook"));

  app.get("/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });
};
