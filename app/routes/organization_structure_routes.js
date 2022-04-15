
module.exports = function (app) {
  
    const organization = require("../controllers/organizationStructure.controller.js");


   //MINISTRY
    app.get('/api/AllMinistries',  organization.getAllMinistries); 

    app.post('/api/AddMinistry',   organization.addMinistry);

    app.post('/api/UpdateMinistry', organization.updateMinistry);

    app.post('/api/DeleteMinistry', organization.deleteMinistry);

    //DEPARTMENTS
    app.get('/api/departments',  organization.getAllDepartments);

    app.post('/api/AddDepartment',  organization.addDepartment);

    app.post('/api/UpdateDepartment',  organization.updateDepartment);

    app.post('/api/DeleteDepartment', organization.deleteDepartment);
  

    //UNITS
     app.get('/api/AllUnits',  organization.getAllUnits);

     app.post('/api/AddUnit',  organization.addUnit);
 
     app.post('/api/UpdateUnit',  organization.updateUnit);
 
     app.post('/api/DeleteUnit', organization.deleteUnit);
  };