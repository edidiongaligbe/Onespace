


module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        member_id: {
        type: Sequelize.STRING(25),
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING(25),
      },
      password: {
        type: Sequelize.STRING(225),
      },
     
    }, {
        timestamps: true
    });
  
    return User;
  };




