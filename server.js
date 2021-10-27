require('dotenv').config();
const express = require("express");

const cors = require('cors');

const app = new express();

var corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

const db = require("./app/utils/database");
db.sequelize.sync({ force: true }).then(() => {
  console.log('"Drop and Resync with { force: true }"');
});

require("./app/routes/indexroutes")(app);
require("./app/routes/usersroutes")(app);
require("./app/routes/memberroutes")(app);
require("./app/routes/organizationStructureroutes")(app);

//look for ways to handle global  errors

port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});