const {ensureAuthenticated} = require('../utils/auth');
module.exports = function (app) {
  
    const organization = require("../controllers/organizationStructure.controller.js");
  

    app.get('/ministries', ensureAuthenticated, (req, res)=>{
      res.render('pages/organizationStructure');
    });

    app.get('/ajaxpeople', ensureAuthenticated, organization.loadPeople);
    

    app.get('/addministry',  ensureAuthenticated, (req, res)=>{
      res.render('pages/addministry');
    });  

    app.post('/addministry',  ensureAuthenticated, organization.addMinistry);
  
  };