var fs = require('fs');
const { QueryTypes } = require("sequelize");
const db = require("../utils/database");

exports.addMember = async(req, res) => {
  try{

    console.log(req.body);

    if(req.file == undefined){
      return res.status(500).send({message:'You must select a profile picture for the new member.'});
    }

    var imageData = fs.readFileSync(`./public/img/uploads/${req.body.firstname}-${req.body.lastname}-${req.file.originalname}` );

    //var imagePath = `/img/profilepics/${Date.now()}-${req.file.originalname}`;
    var imagePath = `${Date.now()}-${req.file.originalname}`;

    const member = {
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      lastname: req.body.lastname,
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
      previousChurchNameAndAddress: req.body.previousChurchNameAndAddress,
      previousChurchMembershipStatus: req.body.previousChurchMembershipStatus,
      baptised: req.body.baptised,
      baptismDate: req.body.baptismDate,
      baptismChurch: req.body.baptismChurch,
      emergencyContactName: req.body.emergencyContactName,
      emergencyContactPhone: req.body.emergencyContactPhone,
      emergencyContactRelationship: req.body.emergencyContactRelationship,
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

exports.getAllMembers = async(req, res) => {
  try{
    let membersData = await db.sequelize.query(`SELECT member_id, CONCAT(ifnull(firstname, ''),' ',ifnull(middlename, ''), ' ',ifnull(lastname, '')) AS 'member', 
     phone, email, gender, CONCAT('http://localhost:3001/images/',passport) as passportUrl FROM members where firstname != 'dev' ORDER BY member`, {
        type:QueryTypes.SELECT
      });
    res.status(200).send({result: membersData})
  } catch(err){
    console.log(err);
    res.status(500).send({message: "Unable to retrieve members."});
  }
};

exports.getOneMember = async(req, res) => {
  try{
    console.log(req.params.memberID);
    let memberData = await db.sequelize.query(`SELECT member_id,  title, CONCAT(ifnull(firstname, ''),' ',ifnull(middlename, ''), ' ',ifnull(lastname, '')) AS 'name', gender, maritalstatus,dob, phone, 
    email, gender, address, occupation, membertype, CONCAT('http://localhost:3001/images/',passport) as passportUrl, previousChurchNameAndAddress,previousChurchMembershipStatus, baptised,
    baptismDate, baptismChurch, emergencyContactName, emergencyContactPhone,  emergencyContactRelationship FROM members where member_id = '${req.params.memberID}' `, {
      type:QueryTypes.SELECT
    });
    console.log(memberData);
    res.status(200).send({result: memberData});
  } catch(err){
    console.log(err);
    res.status(500).send({message: "Unable to retrieve member."});
  }

}