const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const keys = require('../config/keys');

//Patient schema
const Patient = require('../models/patient_schema');

//Functions to validate user input
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

//Registration form validation
router.post("/register", function(req, res) {
	const {errors, isValid} = validateRegisterInput(req.body);
	if (!isValid) {
		//Return error if form input is not valid
		return res.status(400).json(errors);
	}

	Patient.findOne( {email: req.body.email} ).then(patient => {
		if (patient) {
			//Return error if email already registered
			return res.status(400).json( {email: "Email already exists"} );
		}
		else {
		//Store patient details from form into newPatient
		const newPatient = new Patient({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});

		//Hash password using bcrypt
		bcrypt.genSalt(saltRounds, function(err, salt) {
			bcrypt.hash(newPatient.password, salt, function(err, hash) {
				if (err) throw err;
				newPatient.password = hash;

			//Save the patient details to MongoDB
			newPatient.save().then(res.redirect("/"))
							 .catch(err => console.log(err));
			});
		});
		}
	});
});


//Login form validation
router.post("/login", function(req, res) {
	const {errors, isValid} = validateLoginInput(req.body);
	if (!isValid) {
		//Return error if form input is not valid
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	Patient.findOne( {email} ).then(patient => {
		if (!patient) {
			//Return error if email not registered
			return res.status(400).json( {email: "Email not found"} );
		}
		//Compare hashed password
		bcrypt.compare(password, patient.password).then(isMatch => {
			if (isMatch) {
				//User Matched
				res.send("Welcome "+email);
			}
			else {
				return res.status(400).json( {passwordIncorrect: "Password incorrect"} )
			}
		})
	});
});

module.exports = router;