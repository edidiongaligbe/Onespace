

module.exports = (sequelize, Sequelize) => {
    const DetailedAttendance = sequelize.define("DetailedAttendance", {
      Attendance_id:{
          type:Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUID4
      },
      Adults: {
          type: Sequelize.STRING(10)
      },
      Youth: {
        type: Sequelize.STRING(10)
      },
      Children: {
        type: Sequelize.STRING(10)
      }, 

    });
    return DetailedAttendance;
}