

module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("events", {
      event_id:{
          type:Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
      },
      event: {
          type: Sequelize.STRING(50)
      }  
    });
    return Event;
}