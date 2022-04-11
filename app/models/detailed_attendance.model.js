

module.exports = (sequelize, Sequelize) => {
    const DetailedAttendance = sequelize.define("detailed_attendance", {
      attendance_id:{
          type:Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
      },
      adults: {
          type: Sequelize.STRING(10)
      },
      youth: {
        type: Sequelize.STRING(10)
      },
      children: {
        type: Sequelize.STRING(10)
      }, 

    });
    return DetailedAttendance;
}