module.exports = {
<<<<<<< Updated upstream
     secret: process.env.AUTH_SECRET_KEY
=======

    //Let the secret key be picked from the environment variable on the production server.
    secret: "lknfdknfk-sinsjnjs-njdnij'"
    
   /*  ensureAuthenticated : function(req,res,next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg' , 'Please login to view the resource.');
        res.redirect('/');
    } */
>>>>>>> Stashed changes
}