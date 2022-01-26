 

module.exports = (sequelize, Sequelize) => {
    const AssignedRoles = sequelize.define("assigned_roles", {
        assigned_id:{
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        member_id: {
            type: Sequelize.UUID
        },
        role_id: {
            type: Sequelize.UUID
        },
    });

   

    return AssignedRoles;
};