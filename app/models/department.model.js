

module.exports = (sequelize, Sequelize) =>{
    const Department = sequelize.define("Departments", {
        dept_id:{
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
<<<<<<< Updated upstream
        }, 
          
=======
        },       
>>>>>>> Stashed changes
        comment: {
            type: Sequelize.STRING(250),
          },
    });
    return Department;
}