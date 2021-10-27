


module.exports = (sequelize, Sequelize) =>{
    const Ministry = sequelize.define("Ministries", {
        ministry_id:{
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        ministry_name: {
          type: Sequelize.STRING(25),
        },
        comment: {
            type: Sequelize.STRING(250),
          },
    });
    return Ministry;
}