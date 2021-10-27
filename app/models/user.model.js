


module.exports = (sequelize, Sequelize) => {
<<<<<<< Updated upstream
  const User = sequelize.define("Users", {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
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
=======
    const User = sequelize.define("Users", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
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
>>>>>>> Stashed changes

  return User;
};



