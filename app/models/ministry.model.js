


module.exports = (sequelize, Sequelize) =>{
    const Ministry = sequelize.define("Ministries", {
        ministry_id:{
          type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        ministry_name: {
          type: Sequelize.STRING(25),
        },
        ministry_head: {
            type: Sequelize.INTEGER,
          },
        ministry_assistant: {
            type: Sequelize.INTEGER,
            allowNull: true
          },
        comment: {
            type: Sequelize.STRING(250),
          },
    });
    return Ministry;
}