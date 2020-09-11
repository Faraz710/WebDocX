const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const keys = require('../config/keys');

//Doctor schema
const doctor = require('../models/doctor_schema');

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

	Doctor.findOne( {email: req.body.email} ).then(doctor => {
		if (doctor) {
			//Return error if email already registered
			return res.status(400).json( {email: "Email already exists"} );
			//res.redirect("/");
			//res.send('<script>alert("Email already exists")</script>');

		}
		else {
		//Store doctor details from form into newDoctor
		const newDoctor = new Doctor({
			profilePic: {
				data: fs.readFileSync('./public/images/doctor.png'),
				contentType: 'image/png'
			},
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});

		//Hash password using bcrypt
		bcrypt.genSalt(saltRounds, function(err, salt) {
			bcrypt.hash(newDoctor.password, salt, function(err, hash) {
				if (err) throw err;
				newDoctor.password = hash;

			//Save the doctor details to MongoDB
			newDoctor.save().then(res.redirect("/"))
							 .catch(err => console.log(err));
			});
		});
		}
	});
});

router.post("/login", function(req, res) {
	const {errors, isValid} = validateLoginInput(req.body);
	if (!isValid) {
		//Return error if form input is not valid
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	Doctor.findOne( {email} ).then(doctor => {
		if (!doctor) {
			//Return error if email not registered
			return res.status(400).json( {email: "Email not found"} );
		}
		//Compare hashed password
		bcrypt.compare(password, doctor.password).then(isMatch => {
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