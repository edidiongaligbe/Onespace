

module.exports = (sequelize, Sequelize) =>{
    const Healing = sequelize.define("healing", {
        healing_id:{
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        }, 
        phone: {
            type: Sequelize.STRING(125),
            allowNull: true,
        },
        address: {
            type: Sequelize.STRING(250),
            allowNull: true,
        },
    });
    return Healing;
}