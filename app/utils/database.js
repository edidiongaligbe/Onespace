

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB, process.env.DB_USER, process.env.DB_PWD, {
        dialect: 'mysql', host:process.env.DB_HOST, pool:{
            max: 50,
            min: 0,
            acquire:30000,
            idle:10000,
            handleDisconnects: true
        },
        define:{timestamps: false}
    }
)

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models
db.member = require('../models/member.model.js')(sequelize, Sequelize );
db.ministry = require('../models/ministry.model.js')(sequelize, Sequelize);
db.department = require('../models/department.model.js')(sequelize, Sequelize);
db.unit = require('../models/unit.model.js')(sequelize, Sequelize);
db.subunit = require('../models/subunit.model.js')(sequelize, Sequelize);
db.user = require('../models/user.model.js')(sequelize, Sequelize );
db.role = require('../models/role.model.js')(sequelize, Sequelize);
db.assignedRoles = require('../models/assignedRoles.model.js')(sequelize, Sequelize);
db.events = require('../models/events.model.js')(sequelize, Sequelize);
db.detailedAttendance = require('../models/detailedAttendance.model.js')(sequelize, Sequelize);
db.offering = require('../models/offering.model.js')(sequelize, Sequelize);
db.houseFellowshipArea = require('../models/houseFellowshipArea.model.js')(sequelize, Sequelize);
db.country = require('../models/country.model.js')(sequelize, Sequelize);
db.christianQuotes = require('../models/christianQuotes.model.js')(sequelize, Sequelize);

//Member and User relationship
db.member.hasMany(db.user, {foreignKey: 'member_id', sourceKey: 'member_id'});

//Member and User relationship
db.member.hasMany(db.assignedRoles, {foreignKey: 'member_id', sourceKey: 'member_id'});

//Member and Ministry relationship
db.ministry.belongsTo(db.member, {foreignKey: 'ministry_head', targetKey: 'member_id'})

//Member, Ministry and Department relationship
db.department.belongsTo(db.member, {foreignKey: 'dept_head', targetKey: 'member_id'})
db.member.hasMany(db.department, {foreignKey: 'dept_assistant', sourceKey: 'member_id', allowNull: true});
db.ministry.hasMany(db.department, {foreignKey: 'ministry', sourceKey: 'ministry_id'});

//Member, Department and Unit relationship
db.unit.belongsTo(db.member, {foreignKey: 'unit_head', targetKey: 'member_id'})
db.member.hasMany(db.unit, {foreignKey: 'unit_assistant', sourceKey: 'member_id', allowNull: true});
db.department.hasMany(db.unit, {foreignKey: 'department', sourceKey: 'dept_id'});

//Member, Unit and SubUnit relationship
db.subunit.belongsTo(db.member, {foreignKey: 'subUnit_head', targetKey: 'member_id'})
db.member.hasMany(db.subunit, {foreignKey: 'subUnit_assistant', sourceKey: 'member_id', allowNull: true});
db.unit.hasMany(db.subunit, {foreignKey: 'unit_id', sourceKey: 'unit_id'});



//Events and DetailedAttendance relationship
db.detailedAttendance.belongsTo(db.events, {foreignKey: 'event_id', targetKey: 'event_id'});

//Events and Offering relationship
db.offering.belongsTo(db.events, {foreignKey: 'event_id', targetKey: 'event_id'});

//Member and HouseFellowshipArea relationship
db.houseFellowshipArea.belongsTo(db.member, {foreignKey: 'coordinator', targetKey: 'member_id'});




module.exports = db;