


module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        member_id: {
        type: Sequelize.INTEGER,
        
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




