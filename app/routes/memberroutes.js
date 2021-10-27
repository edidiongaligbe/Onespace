

module.exports = function (app) {
 
 const handleImages = require('../controllers/handleImage');
 const memberController = require('../controllers/member.controller');

<<<<<<< Updated upstream
 app.get('/addmember',(req, res) =>{
=======
 app.get('/addmember', (req, res) =>{
>>>>>>> Stashed changes
    res.render('pages/addmember');
  });  

  //all members
<<<<<<< Updated upstream
  app.get('/members', memberController.getAllMembers);
=======
  app.get('/members',  memberController.getAllMembers);
>>>>>>> Stashed changes
 
  //add member
  app.post('/member', handleImages.single('passport'), memberController.addMember);

  //display a single member
  app.get("/member/:memberId", memberController.getAMember);

}