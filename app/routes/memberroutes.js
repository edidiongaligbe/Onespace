

module.exports = function (app) {
 
 const handleImages = require('../controllers/handleImage');
 const memberController = require('../controllers/member.controller');

 app.get('/addmember',(req, res) =>{
    res.render('pages/addmember');
  });  

  //all members
  app.get('/members', memberController.getAllMembers);
 
  //add member
  app.post('/member', handleImages.single('passport'), memberController.addMember);

  //display a single member
  app.get("/member/:memberId", memberController.getAMember);

}