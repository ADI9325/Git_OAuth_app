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
      console.log("OAuth Access Token:", accessToken); // Debugging
      console.log("GitHub Profile:", profile); // Debugging
      return done(null, { profile, accessToken });
    }
  )
);

// ✅ Serialize user (store in session)
passport.serializeUser((user, done) => {
  done(null, { profile: user.profile, accessToken: user.accessToken });
});

// ✅ Deserialize user (retrieve from session)
passport.deserializeUser((user, done) => {
  done(null, user);
});
