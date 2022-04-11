module.exports = (sequelize, Sequelize) =>{
    const HouseFellowshipNewConvert = sequelize.define("house_fellowship_new_convert", {
        convert_id:{
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        name: {
            type: Sequelize.STRING(125),
            allowNull: true,
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
    return HouseFellowshipNewConvert;
}