module.exports = (sequelize, Sequelize) => {
    const HouseFellowshipArea = sequelize.define("HouseFellowshipAreas", {
      HouseFellowshipArea_id:{
          type:Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUID4
      },
      Area: {
          type: Sequelize.STRING(50)
      },
    });
    return HouseFellowshipArea;
}