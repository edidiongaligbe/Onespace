const { role } = require("./app/utils/database");
const db = require("./app/utils/database");

exports.createDev = () => {

  /* Set up user - developer with 'Admin' role. */
  try {

    
    db.member
      .findOne({ where: { firstname: "dev" } })
      .then((user) => {
        if (!user) {
          //START
          db.sequelize.transaction(async function (transaction) {
            const role = await db.role.create(
              {
                name: "Admin",
                comment: "Administrative Role",
              },
              { transaction }
            );

            await db.member.create(
              {
                firstname: "dev",
                middlename: " ",
                lastname: " ",
                title: " ",
                gender: " ",
                maritalstatus: " ",
                dob: " ",
                phone: " ",
                email: " ",
                address: " ",
                occupation: " ",
                membertype: " ",
                passport: " ",
                login_code: "111111",
                temp_role_holder: role.role_id,
              },
              { transaction }
            );

            return role;
          });
          console.log("success");
          //END
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message:
            "Unable to setup DEV role.",
        });
      });


  } catch (error) {
    console.log(error);
  }
};
