const db = require("../utils/database");

exports.addOffering = async(req, res) => {
    try{

    } catch(err) {
        console.log(err);
        res.status(500).send({message: "Unable to save offering."});
    }
}