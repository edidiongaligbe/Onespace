const passport = require('passport');
const bcrypt = require("bcrypt");
const db = require("../utils/database");
const User = db.user;
const Member = db.member;

exports.create = async (req, res) => {
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

    /* Validation passed  */

    //make sure the username is not in use
    User.findOne({ where: { username: username } }).then((user) => {

      if (user) {
        errors.length = 0;
        errors.push({ msg: "Username already taken, please use another one." });
        console.log('user already exists');
        res.render('pages/register',{
          errors: errors
        });
        return
      } 
    }). catch((err) => {
      res.render('pages/error500');
    });

    //Check login code
    Member.findOne({ where: { login_code: code.trim() },  }).then((user) => {

      if (!user) {
        errors.length = 0;
        errors.push({ msg: "Invalid code." });
        console.log('Invalid code');
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
            console.log(err);
            res.render('pages/error500');
          });
          
        }); 
      }
    }). catch((err) => {
      res.render('pages/error500');
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



exports.logout = ('/logout',(req,res)=>{
  //logout user
  req.session.destroy((err) =>{
    res.clearCookie('connect.sid');
        res.clearCookie('_gid');
        res.clearCookie('_ga');
        req.logOut();
        req.user=null
    res.redirect('/');
    });
 
  })
