
const db = require("../app/utils/database");
exports.test = async() => {
    try{
    const buildAssignedRole = await db.assignedRoles.build({
        roles: 'Admin',
        member_id: 'ca872b59-64d6-4174-b131-9e9060186214',
        active: 'true'
      });
      const newRcd = await buildAssignedRole.save();
}catch(err){
console.log(err);
}

}