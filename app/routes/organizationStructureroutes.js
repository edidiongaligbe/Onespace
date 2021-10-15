const {ensureAuthenticated} = require('../utils/auth');
module.exports = function (app) {
  
    const organization = require("../controllers/organizationStructure.controller.js");
  
    app.get('/ajaxpeople', ensureAuthenticated, organization.loadPeople);


    app.get('/ministries', ensureAuthenticated, organization.getAllMinistries);  

    app.get('/addministry',  ensureAuthenticated, (req, res)=>{
      res.render('pages/addministry');
    });  

    app.post('/addministry',  ensureAuthenticated, organization.addMinistry);


    app.get('/departments/:id',  ensureAuthenticated, (req, res)=>{
      res.render('pages/departments');
    });
  
  };