<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
const bcrypt = require("bcrypt");
const db = require("../utils/database");
const User = db.user;
const Member = db.member;

exports.register = async (req, res) => {
<<<<<<< Updated upstream
  /* REGISTER USER */
=======
 /* REGISTER USER */
>>>>>>> Stashed changes

  const { code, username, password, cpassword } = req.body;

  let errors = [];

  console.log(
    " code: " +
      code +
      ", username :" +
      username +
      ", pass:" +
      password +
      ", pass2:" +
      cpassword
  );

  //Validations
  if (!code || !username || !password || !cpassword) {
    res.status(400).send({
<<<<<<< Updated upstream
      message: "Please fill in all fields",
=======
      message: "Please fill in all fields"
>>>>>>> Stashed changes
    });
    return;
  }

  if (password !== cpassword) {
    res.status(400).send({
<<<<<<< Updated upstream
      message: "Passwords dont match.",
=======
      message: "Passwords dont match."
>>>>>>> Stashed changes
    });
    return;
  }

  if (password.length < 6) {
    res.status(400).send({
<<<<<<< Updated upstream
      message: "Password atleast 6 characters.",
    });
    return;
  }

  /* Validation passed  */

  //Make sure the username is not in use
  User.findOne({ where: { username: username } })
    .then((user) => {
      if (user) {
        res.status(400).send({
          message: "Username already taken, please use another one.",
        });
        return;
      }
    })
    .catch((err) => {
      res.render("pages/error500");
    });

  //Check login code
  Member.findOne({ where: { login_code: code.trim() } })
    .then((user) => {
      if (!user) {
        res.status(400).send({
          message: "Invalid code.",
        });
        return;
      } else {
        //Save user to database
        bcrypt.hash(password, 10, (err, hash) => {
          console.log(hash);
=======
      message: "Password atleast 6 characters."
    });
    return;
  }
  

  //Make sure the username is not in use
  User.findOne({ where: { username: username } }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Username already taken, please use another one."
        });
        return;
      } 
  }). catch((err) => {
      res.render('pages/error500');
  });

  //Confirm login code
  Member.findOne({ where: { login_code: code.trim() },  }).then((user) => {

      if (!user) {
        errors.length = 0;
        res.status(400).send({
          message: "Invalid code."
        });
        console.log('Invalid code');
        return
      } else {

        //Save user to database
         bcrypt.hash(password, 10, (err, hash) => {
          console.log(hash)
>>>>>>> Stashed changes
          const user = {
            username: username,
            password: hash,
            member_id: user.member_id,
          };

<<<<<<< Updated upstream
          const newUser = User.build(user);

          newUser
            .save()
            .then((data) => {
              console.log('"User created successfully"');
              res.redirect(301, "/dashboard");
            })
            .catch((err) => {
              res.status(500).send({ message: err });
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.render("pages/error500");
    });
};

exports.login = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
=======
          const newUser = User.build(user)

          newUser.save()
          .then((data) => {
            console.log('"User created successfully"');
            res.redirect(301, "/dashboard");
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({ message: err.message });
          });
          
        }); 
      }
    }). catch((err) => {
      res.render('pages/error500');
    });          
       
>>>>>>> Stashed changes

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      User.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        console.log(authorities);
        res.status(200).send({
          id: user.id,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

<<<<<<< Updated upstream
exports.logout =
  ("/logout",
  (req, res) => {
    //logout user
    req.session.destroy((err) => {
      res.clearCookie("connect.sid");
      res.clearCookie("_gid");
      res.clearCookie("_ga");
      req.logOut();
      req.user = null;
      res.redirect("/");
    });
  });

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
=======

exports.login = (req, res, next) =>{
   /* SIGNIN USER */

  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      User.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        console.log(authorities);
        res.status(200).send({
          id: user.id,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
>>>>>>> Stashed changes
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

<<<<<<< Updated upstream
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
=======
exports.logout = ('/logout', (req,res)=>{
  //logout user
  req.session.destroy((err) =>{
    res.clearCookie('connect.sid');
        res.clearCookie('_gid');
        res.clearCookie('_ga');
        req.logOut();
        req.user=null
    res.redirect('/');
    });
 
})

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
  
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
  
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
  
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
>>>>>>> Stashed changes
};
