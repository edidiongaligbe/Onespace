const db = require("../utils/database");
const { QueryTypes } = require("sequelize");
exports.getMemberID = async(name) => {
    if (name === '' || name === undefined || name === '  '){
        return null;
    }

    const member = await db.sequelize.query(`SELECT member_id FROM members WHERE CONCAT(firstname,' ',middlename, ' ',lastname) = '${name}'`, {
        type:QueryTypes.SELECT});

   return member[0].member_id;
}