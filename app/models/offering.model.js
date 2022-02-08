

module.exports = (sequelize, Sequelize) => {
    const Offering = sequelize.define("offerings", {
      offering_id:{
          type:Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
      },
      totalAmount: {
          type: Sequelize.STRING(50)
      },
      comment: {
        type: Sequelize.STRING(250)
    }  
    });
    return Offering;
}