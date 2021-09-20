const flash = require('connect-flash');
const passport = require('passport');
const express = require("express");
const session = require('express-session');
const app = new express();


//passport config:
require('./src/utils/passport')(passport)

//ejs
app.set("views", "./src/views");
app.set("view engine", "ejs");
//app.use(expressEjsLayout);

//Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
//express session
app.use(session({
  secret : 'secret',
  resave : true,
  saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
    })





const db = require("./src/utils/database");
db.sequelize.sync().then(() => {
  console.log('"Drop and Resync with { force: true }"');
});

//Routes
require("./src/routes/indexroutes")(app);
require("./src/routes/usersroutes")(app);

//look for ways to handle errors

port = process.env.PORT || 3000;
var server = app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});

