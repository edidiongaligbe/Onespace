

module.exports = function (app) {
  
    const user = require("../controllers/user.controller.js");

    app.post("/api/signup", user.signup); 

    app.post('/api/signin', user.signin);

    app.get("/api/logout", user.logout);
  };