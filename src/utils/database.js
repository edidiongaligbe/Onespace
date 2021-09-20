const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'onespace', 'root', 'app@12345', {
        dialect: 'mysql', host:'localhost', pool:{
            max: 5,
            min: 0,
            acquire:30000,
            idle:10000
        }
    }
)

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models
db.user = require('../models/user.model.js')(sequelize, Sequelize );
db.member = require('../models/member.model.js')(sequelize, Sequelize );



module.exports = db;