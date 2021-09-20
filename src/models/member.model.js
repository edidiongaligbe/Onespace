
module.exports = (sequelize, Sequelize) => {
    const Member = sequelize.define("members", {
        member_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstname: {
        type: Sequelize.STRING(25),
      },
      middlename: {
        type: Sequelize.STRING(25),
      },
      lastname:{
          type: Sequelize.STRING(25)
      },
      title: {
          type: Sequelize.STRING(25)
      },
      gender: {
        type: Sequelize.STRING(25)
      },
      maritalstatus: {
        type: Sequelize.STRING(10),
      },
      dob: {
        type: Sequelize.STRING(25),
      },
      phone:{
        type: Sequelize.STRING(25)
    },
      email:{
          type: Sequelize.STRING(25)
      },
      
      address: {
        type: Sequelize.STRING(50),
      },
      occupation:{
          type: Sequelize.STRING(25)
      },
      membertype: {
          type: Sequelize.STRING(20)
      },
      passport: {
        type: Sequelize.BLOB("long")
    },
    },);
  
    return Member;
  };




