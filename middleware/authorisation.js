//MIDDLEWARES FOR AUTHORIZATION

module.exports = {
  
  //Middleware to check if user is still logged in
  stillLoggedIn: function(req, res, next){
    //Redirect to respective dashboard if logged in
    if(req.isAuthenticated()){
      if(req.user.category == "patients") {
        res.redirect("/dashboardPat");
      }
      if(req.user.category == "doctors"){
        res.redirect("/dashboardDoc");
      }
    }
    //Redirect to home if not logged in
    else {
      return next();
    }
  },

  //Middleware to check if user is a patient
  isPatient: function(req, res, next){
    //Check if logged in
    if(req.isAuthenticated()) {
      //Check if patient
      if(req.user.category == "patients") {
        return next();
      }
      else {
        req.flash("error", "You are unauthorized to access this page!!");
        res.redirect("/dashboardDoc");
      }
    }
    else {
      req.flash("error", "Login to continue!!");
      res.redirect("/");
    }
  },

  //Middleware to check if user is a doctor
  isDoctor: function(req, res, next){
    //Check if logged in
    if(req.isAuthenticated()) {
      //Check if doctor
      if(req.user.category == "doctors"){
        return next();
      }
      else {
        req.flash("error", "You are unauthorized to access this page!!");
        res.redirect("/dashboardPat");
      }
    }
    else {
      req.flash("error", "Login to continue!!");
      res.redirect("/");
    }
  }
}