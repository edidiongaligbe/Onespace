const {ensureAuthenticated} = require('../utils/auth');

module.exports = function (app) {
  
    const user = require("../controllers/user.controller.js");
  

    app.post('/login', user.login);

    app.get("/logout", user.logout);
    
    app.get('/register', (req, res) =>{
      res.render('pages/register');
    });    
    
    app.post("/register", user.create);    

    app.get('/dashboard', ensureAuthenticated, (req, res) =>{
      res.render('pages/dashboard');
    });

   
  
    /* // Retrieve all book
    app.get("/api/books", book.findAll);
  
    // Retrieve a single book by Id
    app.get("/api/books/:bookId", book.findByPk);
  
    // Update a book with Id
    app.put("/api/books/:bookId", book.update);
  
    // Delete a book with Id
    app.delete("/api/books/:bookId", book.delete); */
  };