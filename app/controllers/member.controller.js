var fs = require('fs');
const { QueryTypes } = require("sequelize");
const db = require("../utils/database");

exports.addMember = async(req, res) => {
  try{

    if(req.file == undefined){
      return res.status(500).send({message:'You must select a profile picture for the new member.'});
    }

    var imageData = fs.readFileSync(`./public/img/uploads/${req.body.firstname}-${req.body.lastname}-${req.file.originalname}` );

    var imagePath = `/img/profilepics/${Date.now()}-${req.file.originalname}`;

    const member = {
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      lastname: req.body.middlename,
      title: req.body.title,
      gender: req.body.gender,
      maritalstatus: req.body.maritalstatus,
      dob: req.body.birthday,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      occupation: req.body.occupation,
      membertype: req.body.membertype,
      passport: imagePath,
      login_code: ' ',
      member_roles: ' '
    }

    
    const newMember = db.member.build(member);
    newMember.save()
        .then((data) => {
          var imgPath = data.passport;
          var imgName = imgPath.replace('/img/profilepics/',' ');
          imgName = imgName.trim();

          fs.writeFileSync(`./public/img/profilepics/${imgName}`, imageData);
          //after writing to profilepics folder, delete the original file from the uploads folder 
          fs.unlinkSync(`./public/img/uploads/${req.body.firstname}-${req.body.lastname}-${req.file.originalname}` );

          console.log('"New member added successfully"');
          res.status(200).send({message: "New member added to the database successfully" });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({ message: "Server error, unable to add new member to the database. Kindly try again later."});
          
        });

  }
  catch(error){
    console.log(error);
    res.status(500).send({message:"Server error, unable to add new member to the database. Kindly try again later."})
  }
  
};

exports.getAllMembers = async(req, res) =>{

  let membersData = await db.sequelize.query("SELECT member_id, CONCAT(ifnull(firstname, ''),' ',ifnull(middlename, ''), ' ',ifnull(lastname, '')) AS 'member', phone, email, passport FROM members where firstname != 'dev'", {
    type:QueryTypes.SELECT
  });
  res.status(200).send({result: membersData})
};

exports.getAMember = async(req, res) => {
  try{
    const memberID = req.params.memberId;
    db.member.findByPk(memberID).then((memberData) => {
      console.log(memberData)
      res.render('pages/memberProfile', {result: memberData})
  }).finally(() => {
      
  });

  } catch(error){
    console.log(error)
  }

}