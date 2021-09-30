module.exports = (sequelize, Sequelize) =>{
    const SubUnit = sequelize.define("SubUnits", {
        subUnit_id:{
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        subUnit_head: {
            type: Sequelize.INTEGER,
          },
        subUnit_assistant: {
            type: Sequelize.INTEGER,
            allowNull: true
          },
        comment: {
            type: Sequelize.STRING(250),
          },
        unit_id: {
            type: Sequelize.INTEGER,
        },
    });
    return SubUnit;
}