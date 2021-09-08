const express = require('express');
const app = new express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static files
app.use(express.static(__dirname + "/public"));


//Templating Engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

//database config file
const db = require('./src/utils/database');
db.sequelize.sync().then( ()=> {
    console.log('"Drop and Resync with { force: true }"');
});

//Routes
require('./src/routes/indexroutes')(app);
require('./src/routes/usersroutes')(app);

port = process.env.PORT || 3000
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
  
    console.log(`App listening on http://localhost:${port}`);
  });





/* const express = require('express');
const app = new express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static files
app.use(express.static(__dirname + "/public"));



//Templating Engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./src/routes/index'));
app.use('/users', require('./src/routes/usersroutes')); 



port = process.env.PORT || 3000
app.listen(port, () =>{
    console.log(`App listening on http://localhost:${port}`)
}); */