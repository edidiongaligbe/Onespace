

module.exports = function (app) {
  
    const access = require("../controllers/access.controller.js");

    app.post("/api/signup", access.signup); 

    app.post('/api/signin', access.signin);

    app.get("/api/logout", access.logout);

    app.get("/api/AllRoles", access.getAllRoles);

    app.post('/api/AddRole', access.addRole);

    app.post('/api/UpdateRole', access.updateRole);

    app.post('/api/DeleteRole', access.deleteRole);

    app.get('/api/AllAssignedRoles', access.getAllAssignedRoles);

    app.post('/api/AddAssignedRole', access.addAssignedRole);
  };