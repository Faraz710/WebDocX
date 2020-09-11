const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const patient = require('./routes/patient');
const doctor = require('./routes/doctor');
const viewdocs = require('./routes/viewdocs');
<<<<<<< HEAD
//const update = require('./routes/update');
=======
const update = require('./routes/update');
>>>>>>> 617197dca89ac609ad699bf048872ea9bf243b2e
//const consult = require('./routes/consult');

//Parse incoming request body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

//Database Configuration
const db = require("./config/keys").mongoURI;

//Establish connection to database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, })
  		.then(() => console.log("Database successfully connected."))
  		.catch(err => console.log(err));

//API Routes
//1. Homepage
app.get("/", function(req,res) {
	res.render("home");
});
//2. Patient Registration and Login
app.use("/patient/auth", patient);

//3. Doctor Registration and Login
app.use("/doctor/auth", doctor);

//4. Dashboard
//app.get("/dashboard", function(req, res) {
//	res.render("dashboard");
//});
//5. Display list of doctors
app.use("/view/doctors", viewdocs);

//6. Update Profile
//app.use("/update", update);

//7. Update Profile
//app.use("/consult", consult);

//8. Incorrect URL
app.get("*", function(req, res) {
	res.render("error");
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log(`Listening on port ${port}...`);
});