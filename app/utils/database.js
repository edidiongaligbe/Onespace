

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
db.userRole = require('../models/userRole.model.js')(sequelize, Sequelize);
db.events = require('../models/events.model.js')(sequelize, Sequelize);
db.detailedAttendance = require('../models/detailedAttendance.model.js')(sequelize, Sequelize);
db.offering = require('../models/offering.model.js')(sequelize, Sequelize);
db.houseFellowshipArea = require('../models/houseFellowshipArea.model.js')(sequelize, Sequelize);

//Member and User relationship
db.member.hasMany(db.user, {foreignKey: 'Member_id', sourceKey: 'Member_id'});

//Member and Ministry relationship
db.ministry.belongsTo(db.member, {foreignKey: 'Ministry_head', targetKey: 'Member_id'})

//Member, Ministry and Department relationship
db.department.belongsTo(db.member, {foreignKey: 'Dept_head', targetKey: 'Member_id'})
db.member.hasMany(db.department, {foreignKey: 'Dept_assistant', sourceKey: 'Member_id', allowNull: true});
db.ministry.hasMany(db.department, {foreignKey: 'Ministry', sourceKey: 'Ministry_id'});

//Member, Department and Unit relationship
db.unit.belongsTo(db.member, {foreignKey: 'Unit_head', targetKey: 'Member_id'})
db.member.hasMany(db.unit, {foreignKey: 'Unit_assistant', sourceKey: 'Member_id', allowNull: true});
db.department.hasMany(db.unit, {foreignKey: 'Department', sourceKey: 'Dept_id'});

//Member, Unit and SubUnit relationship
db.subunit.belongsTo(db.member, {foreignKey: 'SubUnit_head', targetKey: 'Member_id'})
db.member.hasMany(db.subunit, {foreignKey: 'SubUnit_assistant', sourceKey: 'Member_id', allowNull: true});
db.unit.hasMany(db.subunit, {foreignKey: 'Unit', sourceKey: 'Unit_id'});

//Member, Role and UserRole relationship
db.user.belongsToMany(db.role, {through: db.userRole, foreignKey: 'User_id'});
db.role.belongsToMany(db.user, {through: db.userRole, foreignKey: 'Role_id'});

//Events and DetailedAttendance relationship
db.detailedAttendance.belongsTo(db.events, {foreignKey: 'Event', targetKey: 'Event_id'});

//Events and Offering relationship
db.offering.belongsTo(db.events, {foreignKey: 'Event', targetKey: 'Event_id'});

//Member and HouseFellowshipArea relationship
db.houseFellowshipArea.belongsTo(db.member, {foreignKey: 'Coordinator', targetKey: 'Member_id'});




module.exports = db;