module.exports = function (app) {
    const homecareController = require('../controllers/homecare.controller');
   
     
     app.get('/api/allHomeFellowshipAreas', homecareController.getAllHouseFellowshipArea);
     
     app.post('/api/addHomeFellowshipArea',  homecareController.addHouseFellowshipArea);

     app.post('/api/countHomeFellowshipArea',  homecareController.countHouseFellowshipAreas);

   
     app.post('/api/countHomeFellowshipCenter',  homecareController.countHouseFellowshipCenters);
   
   }