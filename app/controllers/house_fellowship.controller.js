const db = require("../utils/database");
const { QueryTypes } = require("sequelize");


//HOUSE FELLOWSHIP AREA
exports.getAllHouseFellowshipAreas = async(req, res) =>{

    try{
        const data = await db.sequelize.query(`SELECT a.area_id, a.area, CONCAT(IFNULL(c.firstname, ''),' ',IFNULL(c.middlename, ''), ' ',IFNULL(c.lastname, '')) AS 'coordinator',
        CONCAT('http://localhost:3001/images/',c.passport) as passport  
        FROM house_fellowship_areas a JOIN members c ON (a.coordinator = c.member_id) ORDER BY a.area;`,
        {
            type:QueryTypes.SELECT
        });    
        
        res.status(200).send({result:data})
    } catch(err){
        console.log(err);
        res.status(401).send("Unable to retrieve house fellowship areas.");
    }
};

exports.addHouseFellowshipArea = async(req, res) => {
    try{
        const { area, coordinator } = req.body;
        if (!area || !coordinator) {
            res.status(401).send("Kindly make sure the Area, Coordinator fields are not empty.");
            return;
        }

        const coordinatorID = await db.sequelize.query(`SELECT member_id FROM members WHERE CONCAT(firstname,' ',middlename, ' ',lastname) = '${coordinator}'`, {
            type:QueryTypes.SELECT});

        const buildArea = await db.house_fellowship_area.build({
            area: area,
            coordinator: coordinatorID[0].member_id
        });

        const newArea = await buildArea.save();
        res.status(200).send({message: "New Area added to the database successfully."})     

    } catch(err){
        console.log(err);
        res.status(401).send("Unable to add new area to the database.");
    }
};

exports.updateHouseFellowshipArea = async(req, res) => {
    try{
        const {area_id, area, coordinator} = req.body
        if (!area || !coordinator) {
            res.status(401).send({
              message: "Kindly make sure the Area, Coordinator fields are not empty.",
            });
            return;
        }

        const coordinatorID = await db.sequelize.query(`SELECT member_id FROM members WHERE CONCAT(firstname,' ',middlename, ' ',lastname) = '${coordinator}'`, {
            type:QueryTypes.SELECT});

        const updateArea = await db.house_fellowship_area.update(
            {
                area: area,
                coordinator: coordinatorID[0].member_id
            },
            {
               where: {area_id: area_id},
            }
        );
        res.status(200).send({message: "House fellowship area updated successfully."}) 

    } catch(err){
        console.log(err);
        res.status(401).send({message: "Unable to update house fellowship area."});
    }
};

exports.deleteHouseFellowshipArea = async(req, res) => {
    try{
        const deleteArea = await db.house_fellowship_area.destroy({ where: { area_id: req.body.ID } });
        res.status(200).send({message: "House fellowship area deleted successfully."})
    } catch(err){
        console.log(err);
        res.status(401).send("Unable to delete house fellowship area.");
    }
};


exports.getAllHouseFellowshipCenters = async(req, res) => {
    try{
        const data = await db.sequelize.query(`SELECT c.center_id, c.address, CONCAT(IFNULL(p.firstname, ''),' ',IFNULL(p.middlename, ''), ' ',IFNULL(p.lastname, '')) AS 'pastor',
        CONCAT('http://localhost:3001/images/',p.passport) as passport  
        FROM house_fellowship_centers c JOIN members p ON (c.homecare_pastor = p.member_id) ORDER BY 'pastor';`,
        {
            type:QueryTypes.SELECT
        });    
        
        res.status(200).send({result:data})
    } catch(err){
        console.log(err);
        res.status(401).send("Unable to retrieve house fellowship centers.");
    }
};

exports.addHouseFellowshipCenters = async(req, res) => {
    try{
        const { address, pastor } = req.body;
        if (!address || !pastor) {
            res.status(401).send("Kindly make sure the Address, Pastor fields are not empty.");
            return;
        }

        const pastorID = await db.sequelize.query(`SELECT member_id FROM members WHERE CONCAT(firstname,' ',middlename, ' ',lastname) = '${pastor}'`, {
            type:QueryTypes.SELECT});

        const buildCenter = await db.house_fellowship_center.build({
            address: address,
            homecare_pastor: pastorID[0].member_id
        });

        const newCenter = await buildCenter.save();
        res.status(200).send({message: "New center added to the database successfully."})     

    } catch(err){
        console.log(err);
        res.status(401).send("Unable to add new center to the database.");
    }
};


//HOUSE FELLOWSHIP CENTER


//HOUSE FELLOWSHIP VISITOR
exports.getHouseFellowshipVisitors = async(req, res) => {
    
    try{
        
        let reportDate;

        if(!req.body.reportDate){
            reportDate = new Date().toISOString().slice(0, 10);
        } else {
            reportDate = req.body.reportDate;
        }
       console.log("reportDate");
       console.log(reportDate);
       const data = await db.house_fellowship_visitor.findAll({
           where: { reportDate: `${reportDate}`}
       });
       res.status(200).send({result: data})
    } catch(err){
        console.log(err);
        res.status(401).send("Unable to get house fellowship centers.");
    }
}

exports.addHouseFellowshipVisitor = async(req, res) => {
    try{
        const { name, phone, address, reportDate } = req.body;
  
        const buildVisitor = await db.house_fellowship_visitor.build({
            name: name,
            phone: phone,
            address: address,
            reportDate: reportDate
        });
  
        const newVisitor = await buildVisitor.save();
        res.status(200).send({message: "New house fellowship visitor added to the database successfully."})     
  
    } catch(err){
        console.log(err);
        res.status(401).send("Server error, unable to add new house fellowship visitor to the database. Kindly try again later.");
    }
  
  };

  exports.updateHouseFellowshipVisitor = async(req, res) => {
    try{
        const {id, name, phone, address, reportDate} = req.body
  
        const updateVisitor = await db.house_fellowship_visitor.update(
            {
                name: name,
                phone: phone,
                address: address,
                reportDate: reportDate
            },
            {
               where: {visitor_id: id},
            }
        );
        res.status(200).send({message: "House fellowship visitor updated successfully."}) 
  
    } catch(err){
        console.log(err);
        res.status(401).send("Unable to update house fellowship visitor.");
    }
  };

  exports.deleteHouseFellowshipVisitor = async(req, res) => {
    try{
        const deleteVisitor = db.house_fellowship_visitor.destroy({ where: { visitor_id: req.body.ID } });
        res.status(200).send({message: "House fellowship visitor deleted successfully."})
    } catch(err){
        console.log(err);
        res.status(401).send("Unable to delete house fellowship visitor.");
    }
  }