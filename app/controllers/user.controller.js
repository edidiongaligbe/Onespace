const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/authJwt");
const db = require("../utils/database");



exports.signup = async (req, res) => {
  /* REGISTER USER */
  try{

    let assignedRoles = [];
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
  
    //Check login code authenticity
    const getMemberDetails = await db.member.findOne({
      where: { login_code: code.trim() },
    });
    if (!getMemberDetails) {
      res.status(400).send({
        message: "Invalid code.",
      });
      return;
    } 

    /* -------------VALIDATION PASSED----------------  */

 /* ----1. Save user to database.--------*/
 
 console.log(assignedRoles)
   db.user
     .create({
       username: username,
       password: bcrypt.hashSync(password, 10),
       member_id: getMemberDetails.member_id
     })
     .then((newUser) => {
       // delete signup code and assigned roles from the member table
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
    console.log(error);
      res.status(500).send({
        message:
          "An error occured while creating your account. Contact the Administrator.",
    });
  }
 
};

exports.signin =  async(req, res, next) => {

  var authorities = [];
  var firstname, lastname = undefined;
  var token = undefined;
  var randNo = Math.floor(Math.random() * 8) + 1;

  db.user.findOne({ where: { username: req.body.username } })
  .then((result) =>{
    if(!result){
    return res.status(404).send({ message: "Incorrect username or password." });
    }
    
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      result.password
    );

    if (!passwordIsValid) {
        return res.status(401).send({message: "Incorrect username or password.", });
    }

    token = generateToken(result.member_id);

    db.sequelize.query(`SELECT name FROM roles WHERE role_id IN (SELECT role_id FROM assigned_roles WHERE member_id = '${result.member_id}')`,{ type: db.sequelize.QueryTypes.SELECT })
    .then((roles) => {
      if (roles) {
        roles.forEach((item) => {
          authorities.push("ROLE_" + item.name.toUpperCase());
        });
      }
      db.sequelize.query(`SELECT firstname, lastname AS NameOfUser FROM members WHERE member_id = '${result.member_id}'`,{type: db.sequelize.QueryTypes.SELECT})
      .then((name) => {
        firstname = name[0].firstname;
        lastname = name[0].lastname;
        db.sequelize.query(`SELECT * FROM christian_quotes WHERE quote_id = ${randNo}`, {type: db.sequelize.QueryTypes.SELECT,})
        .then((quoteResult) => {
          res.status(200).send({
            roles: authorities,
            quote: quoteResult[0].quote,
            author: quoteResult[0].author,
            firstName: firstname,
            lastName: lastname,
            accessToken: token,
          });
        })    
        .catch((error) => {
            console.log(error);
        });
      }).catch((error) => {
        console.log(error);
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "An error occured while logging you in. Contact the Admin."});
    });
  }).catch((error) => {
    console.log(error);
    res.status(500).send({ message: "An error occured while logging you in. Contact the Admin."});
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

