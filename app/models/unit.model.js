module.exports = (sequelize, Sequelize) =>{
    const Unit = sequelize.define("units", {
        unit_id:{
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        comment: {
            type: Sequelize.STRING(250),
          },
    });
    return Unit;
}