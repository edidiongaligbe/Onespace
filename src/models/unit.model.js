module.exports = (sequelize, Sequelize) =>{
    const Unit = sequelize.define("Units", {
        unit_id:{
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        unit_head: {
            type: Sequelize.INTEGER,
          },
        unit_assistant: {
            type: Sequelize.INTEGER,
            allowNull: true
          },
        comment: {
            type: Sequelize.STRING(250),
          },
        dept_id: {
            type: Sequelize.INTEGER,
        },
    });
    return Unit;
}