

module.exports = function (app) {
  
    const user = require("../controllers/user.controller.js");

    app.post("/register", user.register); 

    app.post('/login', user.login);

    app.get("/logout", user.logout);
    
    app.get('/register', (req, res) =>{
      res.render('pages/register');
    });    
    
    app.post("/register", user.register);    

    app.get('/dashboard', (req, res) =>{
      res.render('pages/dashboard');
    });

    app.get('/dashboard', (req, res) =>{
      //res.render('pages/dashboard');
    });
  };