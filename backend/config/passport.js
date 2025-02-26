const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
require("dotenv").config();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("OAuth Access Token:", accessToken);
      console.log("GitHub Profile:", profile);
      return done(null, { profile, accessToken });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, { profile: user.profile, accessToken: user.accessToken });
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
