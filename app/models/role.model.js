module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
      role_id:{
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
          },  
      name: {
        type: Sequelize.STRING(25),
      },
    }, {
        timestamps: true
    });

   
    return Role;
  };