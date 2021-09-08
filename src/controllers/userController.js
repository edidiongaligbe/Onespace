const db = require('../utils/database');
const User = db.users;

exports.create = (req, res) => {
  const { code, username, password, password2 } = req.body;

  let errors = [];

  console.log(
    " code: " + code + ", username :" + username + ", pass:" + password
  );

  if (!code || !username || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  //Validations
  if (password !== password2) {
    errors.push({ msg: "passwords dont match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "password atleast 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors: errors,
      code: code,
      username: username,
      password: password,
      password2: password2,
    });
  } else {
    //Validation passed
    const user = {
      member_id: "1",
      username: username,
      password: password,
    };

    User.create(user).then((data) => {
      res.status(200).json({
        message: "User created successfully",
      });
    }).catch(err=> {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial."
          });
    });
  }
};
