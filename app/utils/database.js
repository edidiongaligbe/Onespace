const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'onespace', 'root', 'app@12345', {
        dialect: 'mysql', host:'localhost', pool:{
            max: 5,
            min: 0,
            acquire:30000,
            idle:10000
        },
        define:{timestamps: false}
    }
)

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models
db.user = require('../models/user.model.js')(sequelize, Sequelize );
db.member = require('../models/member.model.js')(sequelize, Sequelize );
db.ministry = require('../models/ministry.model.js')(sequelize, Sequelize);
db.department = require('../models/department.model.js')(sequelize, Sequelize);
db.unit = require('../models/unit.model.js')(sequelize, Sequelize);
db.subunit = require('../models/subunit.model.js')(sequelize, Sequelize);





/* db.member.hasMany(db.unit);
db.unit.belongsTo(db.member, {
    foreignKey: 'unit_head',
    foreignKey: 'unit_assistant',
});

db.member.hasMany(db.subunit);
db.subunit.belongsTo(db.member, {
    foreignKey: 'subUnit_head',
    foreignKey: 'subUnit_assistant',
});

db.ministry.hasMany(db.department);
db.department.belongsTo(db.ministry, {
    foreignKey: 'ministry_id',
});

db.department.hasMany(db.unit);
db.unit.belongsTo(db.department, {
    foreignKey: 'dept_id',
});

db.unit.hasMany(db.subunit);
db.subunit.belongsTo(db.unit, {
    foreignKey: 'unit_id',
}); */



module.exports = db;