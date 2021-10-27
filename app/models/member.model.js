
module.exports = (sequelize, Sequelize) => {
    const Member = sequelize.define("Members", {
      member_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      }, 
      firstname: {
        type: Sequelize.STRING(25),
      },
      middlename: {
        type: Sequelize.STRING(25),
        allowNull: true
      },
      lastname:{
          type: Sequelize.STRING(25),
          allowNull: true
      },
      title: {
          type: Sequelize.STRING(25),
          allowNull: true
      },
      gender: {
        type: Sequelize.STRING(25),
        allowNull: true
      },
      maritalstatus: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      dob: {
        type: Sequelize.STRING(25),
        allowNull: true
      },
      phone:{
        type: Sequelize.STRING(25),
        allowNull: true
    },
      email:{
          type: Sequelize.STRING(25),
          allowNull: true
      },
      
      address: {
        type: Sequelize.STRING(250),
        allowNull: true
      },
      occupation:{
          type: Sequelize.STRING(25),
          allowNull: true
      },
      membertype: {
          type: Sequelize.STRING(20),
          allowNull: true
      },
      passport: {
        type: Sequelize.STRING(150),
        allowNull: true
    },
    login_code: {
      type: Sequelize.STRING(150),
      allowNull: true
  } 
    },
     );
  
    return Member;
  };




