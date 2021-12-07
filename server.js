require('dotenv').config();
const express = require("express");
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = new express();

app.use(express.json());
app.use(express.urlencoded());
var corsOptions = {
  origin: '*'
};
app.use(cors(corsOptions));


const db = require("./app/utils/database");
const dbinit = require("./devrole");
db.sequelize.sync().then(() => {
  console.log('"Drop and Resync with { force: true }"');
  dbinit.createDev();
});

require("./app/routes/indexroutes")(app);
require("./app/routes/usersroutes")(app);
require("./app/routes/memberroutes")(app);
require("./app/routes/organizationStructureroutes")(app);


app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});