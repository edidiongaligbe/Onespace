

module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("Events", {
      Event_id:{
          type:Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUID4
      },
      EventName: {
          type: Sequelize.STRING(50)
      }  
    });
    return Event;
}