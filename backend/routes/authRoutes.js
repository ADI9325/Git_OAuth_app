const express = require("express");
const passport = require("passport");

const router = express.Router();

// GitHub OAuth Login
router.get("/github", (req, res, next) => {
  console.log("GitHub OAuth route hit!");
  passport.authenticate("github", { scope: ["repo"] })(req, res, next);
});

// GitHub OAuth Callback
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard");
  }
);

// Logout Route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.send("Logged out");
    });
  });
});

module.exports = router;
