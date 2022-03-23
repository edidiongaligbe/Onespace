const { QueryTypes } = require("sequelize");
const db = require("../utils/database");




//MINISTRY
exports.getAllMinistries = async(req, res) =>{
    try{
        const data = await db.sequelize.query(`SELECT mn.ministry_id, mn.ministry_name AS 'name',  mn.comment, 
        CONCAT(IFNULL(mh.firstname, ''),' ',IFNULL(mh.middlename, ''), ' ',IFNULL(mh.lastname, '')) AS 'head', 
        comment FROM ministries mn JOIN members mh ON (mn.ministry_head = mh.member_id) ORDER BY mn.ministry_name`,
        {
            type:QueryTypes.SELECT
        });    
        
        res.status(200).send({result:data})
    } catch(err){
        console.log(err);
        res.status(500).send({message: "Unable to retrieve ministries."});
    }
 }

exports.addMinistry = async(req, res) => {
    try{
        const { name, head, comment } = req.body;

        const headID = await db.sequelize.query(`SELECT member_id FROM members WHERE CONCAT(firstname,' ',middlename, ' ',lastname) = '${head}'`, {
            type:QueryTypes.SELECT});

        const buildMinistry = await db.ministry.build({
            ministry_name: name,
            ministry_head: headID[0].member_id,
            comment: comment
        });

        const newMinistry = await buildMinistry.save();
        res.status(200).send({message: "New ministry added to the database successfully."})     

    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Server error, unable to add new ministry to the database. Kindly try again later."});
    }

}

exports.updateMinistry = async(req, res) => {
    try{
        const {ministry_id, name, head, comment} = req.body

        const headID = await db.sequelize.query(`SELECT member_id FROM members WHERE CONCAT(firstname,' ',middlename, ' ',lastname) = '${head}'`, {
            type:QueryTypes.SELECT});

        const updateMinistry = await db.ministry.update(
            {
                ministry_name: name,
                ministry_head: headID[0].member_id,
                comment: comment
            },
            {
               where: {ministry_id: ministry_id},
            }
        );
        res.status(200).send({message: "Ministry updated succesfully."}) 

    } catch(err){
        console.log(err);
        res.status(500).send({message: "Unable to update ministry."});
    }
}

exports.deleteMinistry = async(req, res) => {
    const ID = req.body.ministry_id;
    try{
        const deleteMinistry = await db.ministry.destroy({where:{ ministry_id:ID}});
        res.status(200).send({message: "Ministry deleted succesfully."})
    } catch(err){
        console.log(err);
        res.status(500).send({message: "Unable to delete ministry."});
    }
}




//DEPARTMENT
exports.getAllDepartments = async(req, res) =>{

    try{
        const data = await db.sequelize.query(`SELECT dp.dept_id, dp.dept_name AS 'name',
        CONCAT(IFNULL(dh.firstname, ''),' ',IFNULL(dh.middlename, ''), ' ',IFNULL(dh.lastname, '')) AS 'head', 
        CONCAT(IFNULL(da.firstname, ''),' ',IFNULL(da.middlename, ''), ' ',IFNULL(da.lastname, '')) AS 'assistant', 
        IFNULL(mn.ministry_name, '') as 'ministry'
        FROM departments dp JOIN members dh ON (dp.dept_head = dh.member_id) JOIN members da ON (dp.dept_head = da.member_id) JOIN ministries mn
        ON (dp.ministry = mn.ministry_id)
        ORDER BY dp.dept_name, mn.ministry_name`,
        {
            type:QueryTypes.SELECT
        });    
        
        res.status(200).send({result:data})
    } catch(err){
        console.log(err);
        res.status(500).send({message: "Unable to retrieve ministries."});
    }
 }

exports.addDepartment = async(req, res) => {
    try{
        const { name, head, assistant, ministry } = req.body;
        console.log(req.body);

        const headID = await db.sequelize.query(`SELECT member_id FROM members WHERE CONCAT(firstname,' ',middlename, ' ',lastname) = '${head}'`, {
            type:QueryTypes.SELECT});

        const assistID = await db.sequelize.query(`SELECT member_id FROM members WHERE CONCAT(firstname,' ',middlename, ' ',lastname) = '${assistant}'`, {
                type:QueryTypes.SELECT});
                console.log(assistID);
        
        const minID = await db.sequelize.query(`SELECT ministry_id FROM ministries WHERE ministry_name = '${ministry}'`, {
            type:QueryTypes.SELECT});

        const buildDepartment = await db.department.build({
            dept_name: name,
            dept_head: headID[0].member_id,
            dept_assistant: assistID[0].member_id,
            ministry: minID[0].ministry_id
        });

        const newDepartment = await buildDepartment.save();
        res.status(200).send({message: "New department added to the database successfully."})     

    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Server error, unable to add the department to the database. Kindly try again later."});
    }
}

exports.updateDepartment = async(req, res) => {
    try{
        const { id, name, head, assistant, ministry } = req.body;

        const headID = await db.sequelize.query(`SELECT member_id FROM members WHERE CONCAT(firstname,' ',middlename, ' ',lastname) = '${head}'`, {
            type:QueryTypes.SELECT});

        const assistID = await db.sequelize.query(`SELECT member_id FROM members WHERE CONCAT(firstname,' ',middlename, ' ',lastname) = '${assistant}'`, {
                type:QueryTypes.SELECT});
        
        const minID = await db.sequelize.query(`SELECT ministry_id FROM ministries WHERE ministry_name = '${ministry}'`, {
            type:QueryTypes.SELECT});
            console.log(ministry);

        const updateDepartment = await db.department.update(
            {
                dept_name: name,
                dept_head: headID[0].member_id,
                dept_assistant: assistID[0].member_id,
                ministry: minID[0].ministry_id
            },
            {
               where: {dept_id: id},
            }
        );
        res.status(200).send({message: "Department updated succesfully."}) 

    } catch(err){
        console.log(err);
        res.status(500).send({message: "Unable to update ministry."});
    }
}

exports.deleteDepartment = async(req, res) => {
    const ID = req.body.id;
    try{
        const deleteDepartment = await db.department.destroy({where:{ dept_id:ID}});
        res.status(200).send({message: "Department deleted succesfully."})
    } catch(err){
        console.log(err);
        res.status(500).send({message: "Unable to delete department."});
    }
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