module.exports = (sequelize, Sequelize) => {
    const Tithe = sequelize.define("tithes", {
      tithe_id:{
          type:Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
      },
      totalAmount: {
          type: Sequelize.FLOAT
      },
      date_received: {
        type: Sequelize.STRING(250)
      },
      comment: {
        type: Sequelize.STRING(250)
      }  
    });
    return Tithe;
}