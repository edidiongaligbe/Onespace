module.exports = (sequelize, Sequelize) => {
    const HouseFellowshipArea = sequelize.define("house_fellowship_areas", {
      area_id:{
          type:Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
      },
      area: {
          type: Sequelize.STRING(50)
      },
    });
    return HouseFellowshipArea;
}