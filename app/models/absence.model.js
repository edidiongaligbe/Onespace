module.exports = (sequelize, Sequelize) =>{
    const Absence = sequelize.define("absence", {
        absence_id:{
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        }, 
    });
    return Absence;
}