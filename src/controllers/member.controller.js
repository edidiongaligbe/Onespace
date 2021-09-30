var fs = require('fs');
const { QueryTypes } = require("sequelize");
const db = require("../utils/database");
const Member = db.member;

exports.addMember = async(req, res) => {

  let errors = [];
  let success = [];

  if (errors.length > 0) {
    res.render('pages/member',{
      errors: errors
    });
    console.log(errors);
    return

  } else {
    try{
      console.log(req.file);

      if(req.file == undefined){
        return res.send('You must select a file');
      }

      var imageData = fs.readFileSync(`./public/img/uploads/${req.body.firstname}-${req.body.lastname}-${req.file.originalname}` );
      console.log(imagePath);      

      var imagePath = `/img/tmp/${Date.now()}-${req.file.originalname}`;

      const member = {
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        title: req.body.title,
        gender: req.body.gender,
        maritalstatus: req.body.maritalstatus,
        dob: req.body.dob,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        occupation: req.body.occupation,
        membertype: req.body.membertype,
        passport: imagePath
      }

      
      const newMember = Member.build(member);
      newMember.save()
          .then((data) => {
            var imgPath = data.passport;
            var imgName = imgPath.replace('/img/tmp/',' ');
            imgName = imgName.trim();

            fs.writeFileSync(`./public/img/tmp/${imgName}`, imageData);
            //after writing to tmps folder, delete the original file from the uploads folder 
            fs.unlinkSync(`./public/img/uploads/${req.body.firstname}-${req.body.lastname}-${req.file.originalname}` )

            success.push({ msg: "Successful!" });
            console.log('"New member added successfully"');
            
            res.redirect(301, "/members");
          })
          .catch((err) => {
            errors.length = 0;
            errors.push({ msg: "An error occured while adding a member to the database. Kindly contact the administrator." });
            console.log(err);
            res.render('pages/error500');
          });

    }
    catch(err){
      console.log(err);
      res.render('pages/error500');
    }
  }  
}

exports.getAllMembers = async(req, res) =>{

  let membersData = await db.sequelize.query("SELECT member_id, CONCAT(ifnull(firstname, ''),' ',ifnull(middlename, ''), ' ',ifnull(lastname, '')) AS 'person', phone, email, address, passport FROM members where firstname != 'dev'", {
    type:QueryTypes.SELECT
  });

  //let membersData = await Member.findAll({ raw: true });
  console.log(membersData );
  res.render('pages/members', {members: membersData})
}

exports.getAMember = async(req, res) => {
  try{
    const memberID = req.params.memberId;
    Member.findByPk(memberID).then((memberData) => {
      console.log(memberData)
      res.render('pages/memberProfile', {member: memberData})
  }).finally(() => {
      
  });

  } catch(error){
    console.log(error)
  }

}