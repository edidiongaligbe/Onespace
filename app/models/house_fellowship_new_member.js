

module.exports = (sequelize, Sequelize) =>{
    const HouseFellowshipNewMember = sequelize.define("house_fellowship_new_member", {
        testimony_id:{
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
    return HouseFellowshipNewMember;
}