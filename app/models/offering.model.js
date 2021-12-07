

module.exports = (sequelize, Sequelize) => {
    const Offering = sequelize.define("Offerings", {
      Offering_id:{
          type:Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUID4
      },
      TotalAmount: {
          type: Sequelize.STRING(50)
      },
      Comment: {
        type: Sequelize.STRING(250)
    }  
    });
    return Offering;
}