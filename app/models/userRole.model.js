 

module.exports = (sequelize, Sequelize) => {
    const UserRole = sequelize.define("UserRoles", {
        id:{
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        user_id: {
            type: Sequelize.UUID
        },
        role_id: {
            type: Sequelize.UUID
        },
    });

   

    return UserRole;
};