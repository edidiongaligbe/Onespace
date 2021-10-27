
module.exports = function (app) {
  
    const organization = require("../controllers/organizationStructure.controller.js");
  
    app.get('/ajaxpeople',  organization.loadPeople);


    app.get('/ministries',  organization.getAllMinistries);  

    app.get('/addministry',  (req, res)=>{
      res.render('pages/addministry');
    });  

    app.post('/addministry',   organization.addMinistry);


    app.get('/departments/:id',   (req, res)=>{
      res.render('pages/departments');
    });
  
  };