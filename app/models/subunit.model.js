module.exports = (sequelize, Sequelize) =>{
    const SubUnit = sequelize.define("sub_units", {
        subUnit_id:{
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        comment: {
            type: Sequelize.STRING(250),
          },
    });
    return SubUnit;
}