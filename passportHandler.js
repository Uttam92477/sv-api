const passport = require("passport");
const passportKeycloak = require("@exlinc/keycloak-passport");
const passportOAuth = require("passport-oauth2");
const jwt = require("jsonwebtoken");

passport.serializeUser((user, done) => {
  if (user.nameID) {
    done(null, user);
  } else {
    done(new Error("User nameId is not there"), null);
  }
});

passport.deserializeUser((id, done) => {
  done(null, id);
});


const keycloakStrategy = new passportKeycloak(
  {
    host: "http://localhost:8080",
    realm: "ARealm",
    "auth-server-url": "http://localhost:8080/auth/",
    'authorizationURL': "http://localhost:8080/auth/",
    'tokenURL': "http://localhost:8080/auth/",
    'userInfoURL': "http://localhost:8080/auth/",
    "ssl-required": "none",
    clientID: "sv-api",
    resource: "sv-api",
    clientSecret: "clientSecret",
    callbackURL: `callbackURL`
  },
  (accessToken, refreshToken, profile, done) => {
    // This is called after a successful authentication has been completed
    // Here's a sample of what you can then do, i.e., write the user to your DB
    console.log("Success strategy is", profile);
  }
);

const keycloakOAuthStrategy = new passportOAuth({
  authorizationURL: 'http://localhost:8080/auth/realms/ARealm/protocol/openid-connect/auth',
  tokenURL: 'http://localhost:8080/auth/realms/ARealm/protocol/openid-connect/token',
  clientID: "sv-api",
  clientSecret: "secret",
  callbackURL: "http://localhost:5000/login/callback"
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ exampleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
);



passport.use("keycloak", keycloakStrategy);
passport.use("oauth", keycloakOAuthStrategy);

module.exports = passport;