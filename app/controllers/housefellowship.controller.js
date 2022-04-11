const db = require("../utils/database");


//HOUSE FELLOWSHIP AREA
exports.addHouseFellowshipArea = async(req, res) => {
    try{

        const houseFellowshipArea = {
            area: req.body.area,
            coordinator: req.body.coordinator
        }

        const newHouseFellowshipArea = db.houseFellowshipArea.build(houseFellowshipArea);
        const result = await newHouseFellowshipArea.save();
        console.log('New house fellowship area added successfully');
        res.status(200).send({message: "New house fellowship area added to the database successfully" });
        

    } catch(err) {
        console.log(err);
        res.status(401).send({message: "Unable to save home fellowship area."});
    }
}


exports.countHouseFellowshipAreas = async(req, res) => {
    try{
       const areaCount = await db.houseFellowshipArea.count();
       res.status(200).send({result: areaCount})
    } catch(err){
        console.log(err);
        res.status(401).send({message: "Unable to get house fellowship areas."});
    }
}


exports.getAllHouseFellowshipCenters = async(req, res) => {
    try{

    } catch(err){
        console.log(err);
        res.status(401).send({message: "Unable to get house fellowship centers."});
    }
}


//HOUSE FELLOWSHIP CENTER
exports.countHouseFellowshipCenter = async(req, res) => {
    try{
       const centerCount = await db.houseFellowshipCenter.count();
       res.status(200).send({result: centerCount})
    } catch(err){
        console.log(err);
        res.status(401).send({message: "Unable to get house fellowship centers."});
    }
}