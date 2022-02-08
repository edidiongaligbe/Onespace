const db = require("../utils/database");

module.exports = function (app) {
  
    app.get('/api', (req, res) =>{
        res.json({ message: "Welcome!!!!!!!!!!!!!!!!!!!!" });
    }); 

    app.get('/quote', (req, res) =>{
        var randNo = Math.floor((Math.random() * 9));
        console.log("this is random number"+randNo);
        db.sequelize.query(`SELECT * FROM bible_quotes WHERE id = ${randNo}`,{type: db.sequelize.QueryTypes.SELECT}).then((result) => {
            console.log(result);
           res.status(200).send(result);
       }).catch((error) => {
           console.log(error);
           res.status(404).send({message: "Not working"});

       });
    }); 
  };


