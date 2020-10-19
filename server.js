const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const keys = require("./config/keys");
const patient = require('./routes/patient');
const doctor = require('./routes/doctor');
const viewdocs = require('./routes/viewdocs');
const update = require('./routes/update');
const consult = require('./routes/consult');
const post = require('./routes/post');
const dashboardDoc = require('./routes/dashboardDoc');

//Set the view engine to ejs
app.set("view engine", "ejs");

//Parse incoming request body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Serve static files in public directory
app.use(express.static("public"));

//Display flash messages
app.use(flash());

//Make Mongoose use `findOneAndUpdate()`
mongoose.set('useFindAndModify', false);

//Database Configuration
const db = keys.mongoURI;

//Establish connection to database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, })
  		.then(() => console.log("Database successfully connected."))
  		.catch(err => console.log(err));

//File upload middleware
app.use(fileUpload({
    createParentPath: true
}));

//Encode and decode session
app.use(session({
      secret: 'Webdocx',
      resave: false,
      saveUninitialized: false
}));

//Setup passport
app.use(passport.initialize());
app.use(passport.session());

const doctorStrategy = require('./models/doctor_schema');
passport.use('doctorLocal', new localStrategy(doctorStrategy.authenticate()));
const patientStrategy = require('./models/patient_schema');
passport.use('patientLocal', new localStrategy(patientStrategy.authenticate()));


//Set user id as cookie
passport.serializeUser(function(user, done) { 
  let category = Object.getPrototypeOf(user).collection.collectionName;
  done(null,  { userId: user._id, userCategory: category});
});

//Retrieve user from cookie based on id
passport.deserializeUser(function(data, done) {
  //Patient login
  if (data.userCategory === "patients") {
    patientStrategy.findById(data.userId, function(err, account) {      
      var user = account.toJSON();
      user.category = data.userCategory;
      done(err, user);
    });
  }

  //Doctor login
  else {
    doctorStrategy.findById(data.userId, {license: 0}, function(err, account) {
      var user = account.toJSON();
      user.category = data.userCategory;
      done(err, user);
    });
  }
});

//Intermediate data available to all views
app.use(function(req, res, next) {
  res.locals.currentAccount = req.user;
	res.locals.errorMessage = req.flash("error");
	res.locals.successMessage = req.flash("success");
	next();
})

//API ROUTES
//Homepage
app.get("/", stillLoggedIn, function(req,res) {
	res.render("home");
});
//Patient Registration and Login
app.use("/patient/auth", patient);

//Doctor Registration and Login
app.use("/doctor/auth", doctor);

//Logout
app.get('/logout', isLoggedIn, function(req, res){
  //Passport destroys user's session data
  req.logout();
  req.flash("success", "Logged out successfully!!");
  res.redirect('/');
});

//Doctor Dashboard
app.use("/dashboardDoc", isDoctor, dashboardDoc);

//Patient Dashboard
app.get("/dashboardPat", isPatient, function(req, res) {
  res.render("dashboardPat");
});

//Display list of doctors
app.use("/view/doctors", isPatient, viewdocs);

//Update Profile
app.use("/update", isDoctor, update);

//Consult a doctor
app.use("/consult", isLoggedIn, consult);

//Add new post
app.use("/posts", isLoggedIn, post);

//Incorrect URL
app.get("*", function(req, res) {
	res.render("error");
});


//MIDDLEWARES
//Middleware to check if user is logged in
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
	req.flash("error", "Login to continue!!");
  res.redirect("/");
}

//Middleware to check if user is still logged in
function stillLoggedIn(req, res, next){
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
}

//Middleware to check if user is a patient
function isPatient(req, res, next){
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
}

//Middleware to check if user is a doctor
function isDoctor(req, res, next){
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

//Set port for server to listen on
const port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log(`Listening on port ${port}...`);
});