const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("../utils/database");
const User = db.user;

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      (username, password, done) => {
        User.findOne({ where: { username: username } }).then((user) => {
          if (!user) {
            return done(null, false, { message: "Incorrect login details." });
          }

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect login details." });
            }
          });
        });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.member_id);
  });

  passport.deserializeUser((member_id, done) => {
    User.findOne({
      where: {
        member_id: member_id,
      },
    }).then(function (user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
};
