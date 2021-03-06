const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/authJwt");
const db = require("../utils/database");
const cf = require("../utils/customFunctions");



exports.signup = async (req, res) => {
  /* REGISTER USER */
  try{

    
    const { fullname, username, password, cpassword } = req.body;
  
    /* -------------VALIDATIONS----------------  */
  
    if (!fullname.trim() || !username || !password || !cpassword) {
      return res.status(401).send("Please fill in all fields.");
    }
  
    if (password !== cpassword) {
     return res.status(401).send("Check your password and confirm again.");
    }
  
    if (password.length < 6) {
     return res.status(401).send("Password must be atleast 6 characters.");
      
    }
  
    //Make sure the username is not in use
    const user_name = await db.user.findOne({ where: { username: username } });
    if (user_name) {
      console.log(user_name);
      return res.status(401).send("Username already taken, please use another one.");
    }
  
    //make sure its a member
    const getMemberDetails = await db.sequelize.query(`SELECT * FROM members WHERE CONCAT(IFNULL(firstname, ''),' ',IFNULL(middlename, ''), ' ',IFNULL(lastname, '')) = '${fullname.trim()}'`, {
      type:QueryTypes.SELECT});

    if (getMemberDetails.length === 0) {
     return res.status(401).send("Only members are allowed to sign up.");
    } 

    /* -------------VALIDATION PASSED----------------  */

    const newUser = await db.user.create({
      username: username,
      password: bcrypt.hashSync(password, 10),
      member_id: getMemberDetails[0].member_id
    });
    res.status(200).send({ message: "User created successfully" });
 
  

  } catch(error){
    console.log(error);
      res.status(401).send("An error occured while creating your account. Contact the Administrator.");
  }
 
};

exports.signin =  async(req, res, next) => {

 
  var authorities = undefined;
  var token = undefined;
  var randNo = Math.floor(Math.random() * 8) + 1;


  db.user.findOne({ where: { username: req.body.username } })
  .then((result) =>{

    if(!result){
    return res.status(401).send("Incorrect username or password.");
    }
    
    //decrypt password
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      result.password
    );

    if (!passwordIsValid) {
        return res.status(401).send("Incorrect username or password.");
    }

    token = generateToken(result.member_id);

    //get roles
    db.sequelize.query(`SELECT roles FROM assigned_roles WHERE member_id = '${result.member_id}' AND active <> 'false'`,{ type: db.sequelize.QueryTypes.SELECT })
    .then((auth) => {

      if (auth.length === 0) {
        return res.status(401).send("Your account is inactive, contact the administrator.")
      } else {
        authorities = auth[0].roles;
      }

      db.sequelize.query(`SELECT CONCAT(IFNULL(firstname, ''),' ',IFNULL(middlename, ''), ' ',IFNULL(lastname, '')) AS 'user', CONCAT('http://localhost:3001/images/',passport) as 'passportUrl' FROM members WHERE member_id = '${result.member_id}'`,{type: db.sequelize.QueryTypes.SELECT})
      .then((result) => {
        res.status(200).send({
          fullname: result[0].user,
          pic: result[0].passportUrl,
          accessToken: token,
          rights: authorities,
        });

      }).catch((error) => {
        console.log(error);
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(401).send("An error occured while logging you in. Contact the Admin.");
    });
  }).catch((error) => {
    console.log(error);
    res.status(401).send("An error occured while logging you in. Contact the Admin.");
  });
   
};

exports.logout = ("/logout", (req, res) => {
    res.json({message: "twas nice having you around!!!!!!!!"})
});

//ROLES
exports.getAllRoles = async(req, res) => {
  try{
    const data = await db.role.findAll({
      order: [
        ["name", "ASC"],
      ]
    });
    res.status(200).send({result:data})
    
  } catch(err){
      console.log(err);
      res.status(401).send({message: "Unable to retrieve roles."});
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
      res.status(401).send("Server error, unable to add new role to the database. Kindly try again later.");
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
      res.status(200).send({message: "Role updated successfully."}) 

  } catch(err){
      console.log(err);
      res.status(401).send("Unable to update role.");
  }
}

exports.deleteRole = async(req, res) => {
  // How will the user roles be updated when a role is deleted.
  try{
      const deleteRole = db.role.destroy({ where: { role_id: req.body.ID } });
      res.status(200).send({message: "Role deleted successfully."})
  } catch(err){
      console.log(err);
      res.status(401).send("Unable to delete role.");
  }
}


//ASSIGN ROLE
exports.getAllAssignedRoles = async(req, res) => {
  try{
    const data = await db.sequelize.query(`SELECT ar.assigned_id,  ar.roles, ar.active, CONCAT('http://localhost:3001/images/',m.passport) as passport, 
    CONCAT(IFNULL(m.firstname, ''),' ',IFNULL(m.middlename, ''), ' ',IFNULL(m.lastname, '')) AS 'member'
    FROM assigned_roles ar JOIN members m ON (ar.member_id = m.member_id) WHERE m.firstname <> 'dev' ORDER BY 'member'`, {type:QueryTypes.SELECT});

    res.status(200).send({result:data});
  } catch(err){
    console.log(err);
    res.status(401).send({message: "Unable to retrieve ministries."});
  }
}

exports.addAssignedRole = async(req, res) => {
  
  try{
    const { name, role, active } = req.body;

    if (!name || name === '' || role.length === 0) {
      res.status(401).send("Kindly provide the name of the user and roles assigned to the user.");
      return;
    }

    const memberID = await cf.getMemberID(name);
    const loginCode = cf.generateRandomChars(6);

    //make sure only one instance of the user exists in the assigned roles table
    var checkUser = await db.assignedRoles.findOne({ where: { member_id: memberID } });
    if (checkUser !== null){
      res.status(401).send(`'${name}' can only be updated not added as a new user.`);
      return;
    }

    let str = /,/g;
    let roleToString = role.toString().replace(str, ', ');
    
    const buildAssignedRole = await db.assignedRoles.build({
      roles: roleToString,
      member_id: memberID,
      active: active
    });

    const newRcd = await buildAssignedRole.save();

    const assignLoginCode = await db.member.update(
      {
          login_code: loginCode.trim(),
      },
      {
         where: {member_id: memberID},
      }
    );

    

    res.status(200).send({message: "Role(s) assigned successfully."})

  } catch(err){
      console.log(err);
      res.status(401).send("Unable to grant access user.");
  }
}

exports.deleteAssignedRole = async(req, res) => {
  try{
    const deleteAccess = await db.assignedRoles.destroy({ where: { assigned_id: req.body.ID } });
     res.status(200).send({message: "User deleted successfully."})
  }catch(err){
    console.log(err);
    res.status(401).send("Unable to delete user.");
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



