module.exports = function (app) {
    const houseFellowshipController = require('../controllers/house_fellowship.controller');
   
     //Areas
     app.get('/api/AllHouseFellowshipAreas', houseFellowshipController.getAllHouseFellowshipAreas);
     
     app.post('/api/AddHouseFellowshipArea',  houseFellowshipController.addHouseFellowshipArea);

     app.post('/api/UpdateHouseFellowshipArea',  houseFellowshipController.updateHouseFellowshipArea);

     app.post('/api/DeleteHouseFellowshipArea',  houseFellowshipController.deleteHouseFellowshipArea);

     
     //Centers
     app.get('/api/AllHouseFellowshipCenters', houseFellowshipController.getAllHouseFellowshipCenters);

     app.post('/api/AddHouseFellowshipCenter',  houseFellowshipController.addHouseFellowshipCenters);

     //House fellowship meeting visitors
     app.get('/api/GetHouseFellowshipVisitors',  houseFellowshipController.getHouseFellowshipVisitors);

     app.post('/api/AddHouseFellowshipVisitor',  houseFellowshipController.addHouseFellowshipVisitor);

     app.post('/api/UpdateHouseFellowshipVisitor',  houseFellowshipController.updateHouseFellowshipVisitor);

     app.post('/api/DeleteHouseFellowshipVisitor',  houseFellowshipController.deleteHouseFellowshipVisitor);
   
   }