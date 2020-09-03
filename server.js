const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const patient = require('./routes/patient');
const doctor = require('./routes/doctor');

const app = express();

//parse incoming request body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.set("view engine", "ejs");

//Homepage
app.get("/", function(req,res) {
	res.render("home");
});

//DB Config
const db = require("./config/keys").mongoURI;
//Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, })
  		.then(() => console.log("Database successfully connected."))
  		.catch(err => console.log(err));

//Routes
//1. Patient Registration and Login
app.use("/patient", patient);

//2. Doctor Registration and Login
app.use("/doctor", doctor);

const port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log(`Listening on port ${port}...`);
});