module.exports = function (app) {
  
    const user = require("../controllers/userController.js");
  
    
    app.get('/register', (req, res) =>{
      res.render('pages/register');
    });
    
    // Create a new user
    app.post("/register", user.create);
  
    /* // Retrieve all book
    app.get("/api/books", book.findAll);
  
    // Retrieve a single book by Id
    app.get("/api/books/:bookId", book.findByPk);
  
    // Update a book with Id
    app.put("/api/books/:bookId", book.update);
  
    // Delete a book with Id
    app.delete("/api/books/:bookId", book.delete); */
  };