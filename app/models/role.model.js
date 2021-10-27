module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("Roles", {
      role_id:{
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
          },  
      name: {
        type: Sequelize.STRING(25),
      },
      comment: {
        type: Sequelize.STRING(225),

        allowNull: false,
      },
     
    }, {
        timestamps: true
    });

   
    return Role;
  };