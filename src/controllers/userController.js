const passport = require('passport');
const bcrypt = require("bcrypt");
const db = require("../utils/database");
const User = db.user;

exports.create = (req, res) => {
  //register user

  const { code, username, password, cpassword } = req.body;

  let errors = [];

  console.log(
    " code: " +
      code +
      ", username :" +
      username +
      ", pass:" +
      password +
      ", pass2:" +
      cpassword
  );

  //Validations
  if (!code || !username || !password || !cpassword) {
    errors.push({ msg: "Please fill in all fields" });
  }
  
  if (password !== cpassword) {
    errors.push({ msg: "Passwords dont match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password atleast 6 characters" });
  }

  if (errors.length > 0) {
    res.render('pages/register',{
      errors: errors
    });
    console.log(errors);
    return

  } else {

    //Validation passed 
    User.findOne({ where: { username: username } }).then((user) => {

      if (user) {
        errors.length = 0;
        errors.push({ msg: "Username already taken, please use another one." });
        console.log('user already exists');
        res.render('pages/register',{
          errors: errors
        });
        return

      } else {

              
        bcrypt.hash(password, 10, (err, hash) => {
          console.log(hash)
          const user = {
            member_id: "3",
            username: username,
            password: hash,
          };

          const newUser = User.build(user)

          newUser.save()
          .then((data) => {
            console.log('"User created successfully"');
            res.redirect(301, "/dashboard");
          })
          .catch((err) => {
            errors.length = 0;
            errors.push({ msg: "An error occured while creating your account. Kindly contact the administrator." });
            console.log(err);
            res.render('pages/register',{
              errors: errors
            });
          });
          
        }); 
      }
    }). catch((err) => {
      errors.length = 0;
      errors.push({ msg: "An error occured while creating your account. Kindly contact the administrator." });
      console.log(err);
      res.render('pages/register',{
        errors: errors
      });
    });
  }

};

exports.login = (req, res, next) =>{
  //login user

  passport.authenticate('local',{
    successRedirect : '/dashboard',
    failureRedirect : '/',
    badRequestMessage: 'Incorrect login details',
    failureFlash : true,
    })(req,res,next);
};



exports.get = ('/logout',(req,res)=>{
  //logout user
  req.logout();
  req.flash('success_msg','Now logged out');
  res.redirect('/'); 
  })
