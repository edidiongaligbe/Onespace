
/* module.exports = (sequelize, Sequelize) =>{
    const User = sequelize.define('users', {
    member_id:{type: Sequelize.STRING},
    username: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING},
    dateCreated:{type: Sequelize.STRING},
});
} */


module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        member_id: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
     
    }, {
        timestamps: true
    });
  
    return User;
  };




