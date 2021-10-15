const { QueryTypes } = require("sequelize");
const db = require("../utils/database");

const Ministry = db.ministry;
const Department = db.department;
const Unit = db.unit;
const SubUnit = db.subunit;


exports.loadPeople = async(req, res) =>{
    try{
        let peopleData = await db.sequelize.query("SELECT CONCAT(firstname,' ',middlename, ' ',lastname) AS 'Person' FROM members where firstname != 'dev'", {
            type:QueryTypes.SELECT
        });
        console.log(peopleData );
        res.json({peopleData });        

    }catch (error){
       console.log(error);
       res.render('pages/error500');
    }

}

//Ministry
exports.addMinistry = async(req, res) => {
    let errors = [];
    let success = [];
    const { ministryname, head, assistant, comment } = req.body;

    console.log(ministryname)
    
    try{
        
        if (!ministryname ) {
            errors.push({ msg: "Please fill in the ministry's name." });
        }

        if (!head ) {
            errors.push({ msg: "Please fill in the ministry's head." });
        }

        if (errors.length > 0) {
            res.render('pages/addministry',{
              errors: errors
            });
            console.log(errors);
            return;

        } else{
            //Pull out head and assistant ids
           

            const headID = await db.sequelize.query(`SELECT member_id FROM members WHERE CONCAT(firstname,' ',middlename, ' ',lastname) = '${head}'`, {
                type:QueryTypes.SELECT});

            
            const assistantID = await  db.sequelize.query(`SELECT member_id FROM members WHERE CONCAT(firstname,' ',middlename, ' ',lastname) = '${assistant}'`, {
                    type:QueryTypes.SELECT});
          

            //insert new ministry
            await  Ministry.create({
                ministry_name: ministryname,
                ministry_head: headID[0].member_id,
                ministry_assistant: assistantID[0].member_id,
                comment: comment
            })
            .then((data) => {    
              success.push({ msg: "Successful!" });
              console.log('"New ministry added successfully"');              
              res.redirect(301, "/ministries");
            })
            .catch((err) => {
              errors.length = 0;
              errors.push({ msg: "An error occured while adding a ministry to the database. Kindly contact the administrator." });
              console.log(err);
              res.render('pages/error500');
            });
        }       

    } catch(err){
        console.log(err);
        errors.length = 0;
        errors.push({ msg: "An error occured while adding a ministry to the database. Kindly contact the administrator." });
        res.render('pages/error500');
    }

}

exports.getAllMinistries = async(req, res) =>{

    let ministriesData = await db.sequelize.query(`SELECT mn.ministry_id, mn.ministry_name AS 'name',  mn.comment, CONCAT(IFNULL(mh.firstname, ''),' ',IFNULL(mh.middlename, ''), ' ',IFNULL(mh.lastname, '')) AS 'head', CONCAT(IFNULL(ma.firstname, ''),' ',IFNULL(ma.middlename, ''), ' ',IFNULL(ma.lastname, '')) AS 'assistant' FROM ministries mn JOIN members mh ON (mn.ministry_head = mh.member_id) JOIN members ma ON (mn.ministry_assistant = ma.member_id) ORDER BY mn.ministry_id`, {
      type:QueryTypes.SELECT
    });    
    console.log(ministriesData );
    res.render('pages/ministries', {ministries: ministriesData})
 }

 exports.getAllMinistriesForDept = async(req, res) =>{

    let allMin = await Ministry.findAll({
        attributes: ['ministry_id','ministry_name']
      })   
    console.log(allMin );
    res.render('pages/ministries', {ministries: allMin})
 }

exports.deleteMinistry = async(req, res) => {
    
}

exports.updateMinistry = async(req, res) => {
    
}


//Department
exports.addDepartment = async(req, res) => {

}

exports.deleteDepartment = async(req, res) => {
    
}

exports.updateDepartment = async(req, res) => {
    
}


//Unit
exports.addUnit = async(req, res) => {

}

exports.deleteUnit = async(req, res) => {
    
}

exports.updateUnit = async(req, res) => {
    
}


//SubUnit
exports.addSubUnit = async(req, res) => {

}

exports.deleteSubUnit = async(req, res) => {
    
}

exports.updateSubUnit = async(req, res) => {
    
}