const { QueryTypes } = require("sequelize");
const db = require("../utils/database");
const cf = require("../utils/customFunctions");



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
        res.status(401).send({message: "Unable to retrieve ministries."});
    }
 }

exports.addMinistry = async(req, res) => {
    try{
        const { name, head, comment } = req.body;
        if (!name || !head) {
            res.status(401).send("Kindly make sure the Name, Head fields are not empty.");
            return;
        }

        const headID = await db.sequelize.query(`SELECT member_id FROM members WHERE CONCAT(firstname,' ',middlename, ' ',lastname) = '${head}'`, {
            type:QueryTypes.SELECT});

        const buildMinistry = await db.ministry.build({
            ministry_name: name,
            ministry_head: headID[0].member_id,
            comment: comment
        });

        const newMinistry = await buildMinistry.save();
        console.log(newMinistry);
        res.status(200).send({message: "New ministry added to the database successfully."})     

    } catch(err){
        console.log(err);
        res.status(401).send("Unable to add new ministry to the database.");
    }

}

exports.updateMinistry = async(req, res) => {
    try{
        const {ministry_id, name, head, comment} = req.body
        if (!name || !head) {
            res.status(401).send({
              message: "Kindly make sure the Name, Head fields are not empty.",
            });
            return;
        }

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
        res.status(200).send({message: "Ministry updated successfully."}) 

    } catch(err){
        console.log(err);
        res.status(401).send({message: "Unable to update ministry."});
    }
}

exports.deleteMinistry = async(req, res) => {
    try{
        const deleteMinistry = await db.ministry.destroy({ where: { ministry_id: req.body.ID } });
        res.status(200).send({message: "Ministry deleted successfully."})
    } catch(err){
        console.log(err);
        res.status(401).send("Unable to delete ministry.");
    }
}




//DEPARTMENT
exports.getAllDepartments = async(req, res) =>{

    try{
        const data = await db.sequelize.query(`SELECT dp.dept_id, dp.dept_name AS 'name',
        CONCAT(IFNULL(dh.firstname, ''),' ',IFNULL(dh.middlename, ''), ' ',IFNULL(dh.lastname, '')) AS 'head', 
        IFNULL(CONCAT(IFNULL(da.firstname, ''),' ',IFNULL(da.middlename, ''), ' ',IFNULL(da.lastname, '')), '') AS 'assistant', 
        IFNULL(mn.ministry_name, '') as 'ministry'
        FROM departments dp JOIN members dh ON (dp.dept_head = dh.member_id) LEFT OUTER JOIN members da ON (dp.dept_assistant = da.member_id) JOIN ministries mn
        ON (dp.ministry = mn.ministry_id)
        ORDER BY dp.dept_name, 'ministry';`,
        {
            type:QueryTypes.SELECT
        });    
        
        res.status(200).send({result:data})
    } catch(err){
        console.log(err);
        res.status(401).send("Unable to retrieve ministries.");
    }
 }

exports.addDepartment = async(req, res) => {
    try{
        const { name, head, assistant, ministry } = req.body;

        if (!name || !head || !ministry) {
            res.status(401).send("Kindly make sure the Name, Head and Ministry fields are not empty.");
            return;
        }
        

        const headID = await db.sequelize.query(`SELECT member_id FROM members WHERE CONCAT(firstname,' ',middlename, ' ',lastname) = '${head}'`, {
            type:QueryTypes.SELECT});
        
        const assistID = await cf.getMemberID(assistant);
        
        const minID = await db.sequelize.query(`SELECT ministry_id FROM ministries WHERE ministry_name = '${ministry}'`, {
            type:QueryTypes.SELECT});

        const buildDepartment = await db.department.build({
            dept_name: name,
            dept_head: headID[0].member_id,
            dept_assistant: assistID,
            ministry: minID[0].ministry_id
        });

        const newDepartment = await buildDepartment.save();
        res.status(200).send({message: "New department added to the database successfully."})     

    } catch(err){
        console.log(err);
        res.status(401).send("Server error, unable to add the department to the database. Kindly try again later.");
    }
}

exports.updateDepartment = async(req, res) => {
    try{
        const { id, name, head, assistant, ministry } = req.body;
        if (!name || !head || !ministry) {
            res.status(401).send("Kindly make sure the Name, Head and Ministry fields are not empty.");
            return;
        }

        const headID = await db.sequelize.query(`SELECT member_id FROM members WHERE CONCAT(firstname,' ',middlename, ' ',lastname) = '${head}'`, {
            type:QueryTypes.SELECT});

        const assistID = await cf.getMemberID(assistant);
        
        const minID = await db.sequelize.query(`SELECT ministry_id FROM ministries WHERE ministry_name = '${ministry}'`, {
            type:QueryTypes.SELECT});
            console.log(ministry);

        const updateDepartment = await db.department.update(
            {
                dept_name: name,
                dept_head: headID[0].member_id,
                dept_assistant: assistID,
                ministry: minID[0].ministry_id
            },
            {
               where: {dept_id: id},
            }
        );
        res.status(200).send({message: "Department updated successfully."}) 

    } catch(err){
        console.log(err);
        res.status(401).send("Unable to update ministry.");
    }
}

exports.deleteDepartment = async(req, res) => {
    try{
        const deleteDepartment = await db.department.destroy({ where: { dept_id: req.body.ID } });
        res.status(200).send({message: "Department deleted successfully."})
    } catch(err){
        console.log(err);
        res.status(401).send("Unable to delete department.");
    }
}




//UNIT
exports.getAllUnits = async(req, res) =>{

    try{
        const data = await db.sequelize.query(`SELECT un.unit_id, un.unit_name AS 'name',
        CONCAT(IFNULL(uh.firstname, ''),' ',IFNULL(uh.middlename, ''), ' ',IFNULL(uh.lastname, '')) AS 'head', 
        IFNULL(CONCAT(IFNULL(ua.firstname, ''),' ',IFNULL(ua.middlename, ''), ' ',IFNULL(ua.lastname, '')), '') AS 'assistant', 
        IFNULL(dp.dept_name, '') as 'department', IFNULL(mn.ministry_name, '') as 'ministry'
        FROM units un JOIN members uh ON (un.unit_head = uh.member_id) LEFT OUTER JOIN members ua ON (un.unit_assistant = ua.member_id) JOIN departments dp
        ON (un.department = dp.dept_id) JOIN ministries mn ON (dp.ministry = mn.ministry_id)
        ORDER BY un.unit_name, 'department', 'ministry'`,
        {
            type:QueryTypes.SELECT
        });    
        
        res.status(200).send({result:data})
    } catch(err){
        console.log(err);
        res.status(401).send("Unable to retrieve units.");
    }
 }
exports.addUnit = async(req, res) => {
    try{
        const { name, head, assistant, department } = req.body;
        if (!name || !head || !department) {
            res.status(401).send("Kindly make sure the Name, Head and Department fields are not empty.");
            return;
        }

        const headID = await db.sequelize.query(`SELECT member_id FROM members WHERE CONCAT(firstname,' ',middlename, ' ',lastname) = '${head}'`, {
            type:QueryTypes.SELECT});

        const assistID = await cf.getMemberID(assistant);
        
        const deptID = await db.sequelize.query(`SELECT dept_id FROM departments WHERE dept_name = '${department}'`, {
            type:QueryTypes.SELECT});

        const buildUnit = await db.unit.build({
            unit_name: name,
            unit_head: headID[0].member_id,
            unit_assistant: assistID,
            department: deptID[0].dept_id
        });

        const newUnit = await buildUnit.save();
        res.status(200).send({message: "New unit added to the database successfully."})     

    } catch(err){
        console.log(err);
        res.status(401).send({ message: "Server error, unable to add the unit to the database. Kindly try again later."});
    }
}

exports.updateUnit = async(req, res) => {
    try{
        const { id, name, head, assistant, department } = req.body;
        if (!name || !head || !department) {
            res.status(401).send("Kindly make sure the Name, Head and Department fields are not empty.");
            return;
        }

        const headID = await db.sequelize.query(`SELECT member_id FROM members WHERE CONCAT(firstname,' ',middlename, ' ',lastname) = '${head}'`, {
            type:QueryTypes.SELECT});

        const assistID = await cf.getMemberID(assistant);
        
        const deptID = await db.sequelize.query(`SELECT dept_id FROM departments WHERE dept_name = '${department}'`, {
            type:QueryTypes.SELECT});

        const updateUnit = await db.unit.update(
            {
                unit_name: name,
                unit_head: headID[0].member_id,
                unit_assistant: assistID,
                department: deptID[0].dept_id
            },
            {
               where: {unit_id: id},
            }
        );
        res.status(200).send({message: "Unit updated successfully."}) 

    } catch(err){
        console.log(err);
        res.status(401).send("Unable to update unit.");
    }
}

exports.deleteUnit = async(req, res) => {
    try{
        const deleteUnit = await db.unit.destroy({ where: { unit_id: req.body.ID } });
        res.status(200).send({message: "Unit deleted successfully."})
    } catch(err){
        console.log(err);
        res.status(401).send("Unable to delete Unit.");
    } 
}






