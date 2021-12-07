const bcrypt = require("bcrypt");
const { userRole } = require("../utils/database");
const db = require("../utils/database");



exports.signup = async (req, res) => {
  /* REGISTER USER */
  try{

    const { code, username, password, cpassword } = req.body;
  
    /* -------------VALIDATIONS----------------  */
  
    if (!code || !username || !password || !cpassword) {
      res.status(400).send({
        message: "Please fill in all fields.",
      });
      return;
    }
  
    if (password !== cpassword) {
      res.status(400).send({
        message: "Check your password and confirm again.",
      });
      return;
    }
  
    if (password.length < 6) {
      res.status(400).send({
        message: "Password must be atleast 6 characters.",
      });
      return;
    }
  
    //Make sure the username is not in use
    const user_name = await db.user.findOne({ where: { username: username } });
    if (user_name) {
      console.log(user_name);
      res.status(400).send({
        message: "Username already taken, please use another one.",
      });
      return;
    }
  
    //Check login code
    
    const getCode = await db.member.findOne({ where: { login_code: code.trim() } });
    if (!getCode) {
      res.status(400).send({
        message: "Invalid code.",
      });
      return;
    } 

    /* -------------VALIDATION PASSED----------------  */

   /* 1. Save user to database.
      2. Delete signup code value that belongs to the user in the members table.
      UPDATE - No need to create the user roles table for this app. the roles will be stored in 'roles' column in the
      members table. when there is a need for it, pull the record out and put them in an array then work with it.
      
  */
   db.user
     .create({
       username: username,
       password: bcrypt.hashSync(password, 10),
       member_id: getCode.member_id,
     })
     .then((newUser) => {
       db.member.update(
         { login_code: "" },
         { where: { member_id: newUser.member_id } }
       );
       res.status(200).send({ message: "User created successfully" });
     })
     .catch((error) => {
       console.log(error);
       res.status(500).send({
         message:
           "An error occured while creating your account. Contact the Administrator.",
       });
     });

  } catch(error){
    console.log(err);
      res.status(500).send({
        message:
          "An error occured while creating your account. Contact the Administrator.",
    });
  }
 
};

exports.signin = (req, res, next) => {
  db.user.findOne({
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

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: member_id }, config.secret, {
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
      console.log(err);
      res.status(500).send({
        message: "An error occured while logging you in. Contact the Admin.",
      });
    });
};

exports.logout = ("/logout", (req, res) => {
    res.json({message: "twas nice having you around!!!!!!!!"})
  });

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.seniorPastorBoard = (req, res) => {
  res.status(200).send("Senior Pastor Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
