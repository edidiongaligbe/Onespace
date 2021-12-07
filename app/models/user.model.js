


module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("Users", {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    Username: {
      type: Sequelize.STRING(25),
    },
    Password: {
      type: Sequelize.STRING(225),
    },
   
  }, {
      timestamps: true
  });

  return User;
};



