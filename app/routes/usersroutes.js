

module.exports = function (app) {
  
    const user = require("../controllers/user.controller.js");

    app.post("/register", user.register); 

    app.post('/login', user.login);

    app.get("/logout", user.logout);
    
    app.get('/register', (req, res) =>{
<<<<<<< Updated upstream
      res.render('pages/register');
    });    
    
    app.post("/register", user.register);    

    app.get('/dashboard', (req, res) =>{
      res.render('pages/dashboard');
=======
      // res.render('pages/register');
>>>>>>> Stashed changes
    });

    app.get('/dashboard', (req, res) =>{
      //res.render('pages/dashboard');
    });
  };