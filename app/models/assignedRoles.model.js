 

module.exports = (sequelize, Sequelize) => {
    const AssignedRoles = sequelize.define("assigned_roles", {
        assigned_id:{
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        roles:{
            type: Sequelize.STRING(250),
            allowNull: true,
        },
        active:{
            type: Sequelize.STRING(25),
            allowNull: true,
        }
    });

   

    return AssignedRoles;
};