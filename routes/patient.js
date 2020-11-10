const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Patient schema
const Patient = require('../models/patient_schema');

//Functions to validate user input
const validateRegisterInput = require('../validation/register');

//Patient Register Auth
router.post("/register", function(req, res) {
	//Registration form validation
	const {errors, isValid} = validateRegisterInput(req.body);
	if (!isValid) {
		//Form validation errors
		req.flash("error", errors);
        res.redirect("/");
	}
	else {
		const newPatient = new Patient({
			profilePic: {
				data: fs.readFileSync('./public/images/patient.png'),
				contentType: 'image/png'
			},
			name: req.body.name,
			username: req.body.username,
			age: req.body.age,
			gender: req.body.sex
		});
		Patient.register(newPatient, req.body.password, function(err, patient){
	        if(err) { 
	        	//Database error
		        req.flash("error", err.message);
		        res.redirect("/");
		    }
		    else {
		        passport.authenticate("patientLocal")(req, res, function(){
			        //Auto-login after registration
			        req.login(patient, function (error) {
			            if (error) {
			                req.flash("error", error.message);
			            	res.redirect("/");
			            } 
			            else {
			                req.flash("success", "Successfully registered!!");
			                res.redirect("/dashboardPat"); 
			            }
			        });
		       	});
		    }
		});
	}
});

//Patient Login Auth
router.post("/login", passport.authenticate('patientLocal', {
	successRedirect: '/dashboardPat',
    failureRedirect: '/',
    failureFlash: true
}));

module.exports = router;