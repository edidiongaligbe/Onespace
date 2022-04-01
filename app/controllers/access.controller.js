const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/authJwt");
const db = require("../utils/database");
const cf = require("../utils/customFunctions");



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

//ROLES
exports.getAllRoles = async(req, res) => {
  try{
    const data = await db.role.findAll();
    res.status(200).send({result:data})
    
  } catch(err){
      console.log(err);
      res.status(500).send({message: "Unable to retrieve roles."});
  }
};

exports.addRole = async(req, res) => {
  try{
      const { name } = req.body;

      const buildRole = await db.role.build({
          name: name,
      });

      const newRole = await buildRole.save();
      res.status(200).send({message: "New role added to the database successfully."})     

  } catch(err){
      console.log(err);
      res.status(500).send({ message: "Server error, unable to add new role to the database. Kindly try again later."});
  }

}

exports.updateRole = async(req, res) => {
  try{
      const {id, name} = req.body

      const updateRole = await db.role.update(
          {
              name: name,
          },
          {
             where: {role_id: id},
          }
      );
      res.status(200).send({message: "Role updated succesfully."}) 

  } catch(err){
      console.log(err);
      res.status(500).send({message: "Unable to update role."});
  }
}

exports.deleteRole = async(req, res) => {
  const { user, role} = req.body.id;
  try{
      const deleteRole = await db.role.destroy({where:{ role_id:ID}});
      res.status(200).send({message: "Role deleted succesfully."})
  } catch(err){
      console.log(err);
      res.status(500).send({message: "Unable to delete role."});
  }
}


//ASSIGN ROLE
exports.addAssignedRole = async(req, res) => {
  const { name, role, active } = req.body;

  if (!name || name === '' || role.length === 0) {
    res.status(401).send("Kindly provide the name of the user and roles assigned to the user.");
    return;
  }


  try{
    const memberID = await cf.getMemberID(name);

    //make sure only one instance of the user exists in the assigned roles table
    var checkUser = await db.assignedRoles.findOne({ where: { member_id: memberID } });
    console.log("checkUser");
    console.log(checkUser);


    let str = /,/g;
    let roleToString = role.toString().replace(str, ', ');
    
    
    const buildAssignedRole = await db.assignedRoles.build({
      roles: roleToString,
      member_id: memberID,
      active: active
    });
    const newRcd = await buildAssignedRole.save();
    res.status(200).send({message: "Role(s) assigned succesfully."})

  } catch(err){
      console.log(err);
      res.status(500).send({message: "Unable to grant access user."});
  }
}

exports.getAllAssignedRoles = async(req, res) => {
  try{
    const data = await db.sequelize.query(`SELECT ar.assigned_id,  ar.roles, ar.active, CONCAT('http://localhost:3001/images/',m.passport) as passport, 
    CONCAT(IFNULL(m.firstname, ''),' ',IFNULL(m.middlename, ''), ' ',IFNULL(m.lastname, '')) AS 'member'
    FROM assigned_roles ar JOIN members m ON (ar.member_id = m.member_id) ORDER BY 'member'`, {type:QueryTypes.SELECT});

    res.status(200).send({result:data});
  } catch(err){
    console.log(err);
    res.status(500).send({message: "Unable to retrieve ministries."});
  }
}


/* 
    CODE FOR LOOPING THROUGH ARRAY TO SAVE IN DATABASE
    for(const e of role){
      const assignedRole = db.assignedRoles.build({
        member_id: memberID,
        role_id: e      
      });

      const newRec = await assignedRole.save();
    } */



