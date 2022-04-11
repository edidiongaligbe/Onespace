

module.exports = (sequelize, Sequelize) =>{
    const Attendance = sequelize.define("attendance", {
        attendance_id:{
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        }, 
    });
    return Attendance;
}