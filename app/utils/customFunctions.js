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

exports.getID = async(customQuery, IdField) => {
    try{
        const result = await db.sequelize.query(customQuery, {
        type:QueryTypes.SELECT});

        return result[0][IdField];
    } catch(err){
        console.log(err);
        return null;
    }
   
}

exports.generateRandomChars = (charLen) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < charLen; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}