

module.exports = (sequelize, Sequelize) =>{
    const Department = sequelize.define("departments", {
        dept_id:{
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        }, 
          
        dept_name: {
            type: Sequelize.STRING(250),
          },
    });
    return Department;
}