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

//Set the view engine to ejs
app.set("view engine", "ejs");

//Parse incoming request body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Serve static files in public directory
app.use(express.static("public"));

app.use(flash());

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

app.use(session({
      //Encode and decode session
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


//Set user as cookie
passport.serializeUser(function(user, done) { 
  done(null, user._id);
});

//Get user from cookie
passport.deserializeUser(function(id, done) {
  if(id != null) {
      done(null, id);
  }
});

//Intermediate data available to all views
app.use(function(req, res, next) {
	res.locals.errorMessage = req.flash("error");
	res.locals.successMessage = req.flash("success");
	next();
})

//API Routes
// Homepage
app.get("/", function(req,res) {
	res.render("home");
});
// Patient Registration and Login
app.use("/patient/auth", patient);

// Doctor Registration and Login
app.use("/doctor/auth", doctor);

// Logout
app.get('/logout', isLoggedIn, function(req, res){
  //Passport destroys user's session data
  req.logout();
  req.flash("success", "Logged out successfully!!");
  res.redirect('/');
});

// Doctor Dashboard
app.get("/dashboardDoc", isLoggedIn, function(req, res) {
  console.log(req.user);
	res.render("dashboardDoc");
});

// Patient Dashboard
app.get("/dashboardPat", isLoggedIn, function(req, res) {
  res.render("dashboardPat");
});

// Display list of doctors
app.use("/view/doctors", viewdocs);

// Update Profile
app.use("/update", update);

// Consult
app.use("/consult", isLoggedIn, consult);

// Incorrect URL
app.get("*", function(req, res) {
	res.render("error");
});

//Middleware to check if user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	req.flash("error", "Login to continue!!");
    res.redirect("/")
}

const port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log(`Listening on port ${port}...`);
});