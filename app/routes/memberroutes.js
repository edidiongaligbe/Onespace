

module.exports = function (app) {
 
 const handleImages = require('../controllers/handleImage');
 const memberController = require('../controllers/member.controller');

  //all members
  app.get('/api/members', memberController.getAllMembers);
 
  //add member
  app.post('/api/addmember', handleImages.single('image'), memberController.addMember);

  //display a single member
  app.get("/api/member/:memberID", memberController.getOneMember);

}