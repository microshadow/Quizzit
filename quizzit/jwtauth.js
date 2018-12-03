'use strict';

const passport = require('passport');

const jwt = require('jsonwebtoken');
const jwtPassport = require('passport-jwt');
const JWTStrategy = jwtPassport.Strategy;
const ExtractJWT  = jwtPassport.ExtractJwt;

const jwtSecret = "jesstheiguana";
const jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme("JWT");

const STUDENT = "S", EDUCATOR = "E", ADMIN = "A";


function getSignedToken(user) {
  return jwt.sign({ user: user }, jwtSecret);
}

function prepareTokenPackage(user) {
  const tokenBody = {
    _id: user._id,
    username: user.username,
    userType: user.userType
  };

  const token = getSignedToken(user);
  return {
    token: token,
    // Strip out password from the user object in the response.
    user: {
      _id: user._id,
      username: user.username,
      first: user.first,
      last: user.last,
      userType: user.userType
    }
  };
}


const authorizeUserTypes = (userTypes) => new JWTStrategy({
  secretOrKey: jwtSecret,
  jwtFromRequest: jwtFromRequest
}, (token, done) => {
  try {
    const userType = token.user.userType;

    if (userTypes.includes(userType)) {
      return done(null, token.user);
    } else {
      return done(null, false, { message: "This is a restricted URL." })
    }
  } catch (err) {
    return done(err);
  }
});

passport.use("jwt_all_users", authorizeUserTypes([STUDENT, EDUCATOR, ADMIN]));
passport.use("jwt_educator_and_above", authorizeUserTypes([EDUCATOR, ADMIN]));
passport.use("jwt_admin_only", authorizeUserTypes([ADMIN]));
passport.use("jwt_educator_only", authorizeUserTypes([EDUCATOR]));
passport.use("jwt_student_only", authorizeUserTypes([STUDENT]));

module.exports = {
  prepareToken: prepareTokenPackage
}
