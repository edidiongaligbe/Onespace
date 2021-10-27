
module.exports = function (app) {
  
    const organization = require("../controllers/organizationStructure.controller.js");
  
    app.get('/ajaxpeople',  organization.loadPeople);


    app.get('/ministries',  organization.getAllMinistries);  

<<<<<<< Updated upstream
    app.get('/addministry',  (req, res)=>{
=======
    app.get('/addministry',   (req, res)=>{
>>>>>>> Stashed changes
      res.render('pages/addministry');
    });  

    app.post('/addministry',   organization.addMinistry);


    app.get('/departments/:id',   (req, res)=>{
      res.render('pages/departments');
    });
  
  };