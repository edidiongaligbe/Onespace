module.exports = (sequelize, Sequelize) => {
    const HouseFellowshipCenter = sequelize.define("house_fellowship_center", {
      center_id:{
          type:Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
      },
      address: {
          type: Sequelize.STRING(250)
      },
    });
    return HouseFellowshipCenter;
}