

module.exports = (sequelize, Sequelize) =>{
    const HouseFellowshipMeetingReport = sequelize.define("house_fellowship_meeting_report", {
        meeting_id:{
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        }, 
        meeting_date: {
            type: Sequelize.STRING(125),
            allowNull: true,
        },
        offering: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
        tithe: {
            type: Sequelize.FLOAT,
            allowNull: true,
        }, 
        healings: {
            type: Sequelize.STRING(250),
            allowNull: true,
        },
        water_baptism: {
            type: Sequelize.STRING(125),
            allowNull: true,
        },
        holy_ghost_baptism: {
            type: Sequelize.STRING(250),
            allowNull: true,
        },
        prayer_request: {
            type: Sequelize.STRING(125),
            allowNull: true,
        },
        testimonies: {
            type: Sequelize.STRING(250),
            allowNull: true,
        },
        
        weekly_activities_outline: {
            type: Sequelize.STRING(250),
            allowNull: true,
        },
        comments: {
            type: Sequelize.STRING(250),
            allowNull: true,
        },
    });
    return HouseFellowshipMeetingReport;
}