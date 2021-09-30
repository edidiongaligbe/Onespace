

module.exports = (sequelize, Sequelize) =>{
    const Department = sequelize.define("Departments", {
        dept_id:{
          type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        dept_head: {
            type: Sequelize.INTEGER,
            allowNull: true
            
          },
        dept_assistant: {
            type: Sequelize.INTEGER,
            allowNull: true
          },
        comment: {
            type: Sequelize.STRING(250),
          },
        ministry_id: {
            type: Sequelize.INTEGER,
        },
    });
    return Department;
}