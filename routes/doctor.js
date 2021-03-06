const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');

//Doctor schema
const doctor = require('../models/doctor_schema');

//Functions to validate user input
const validateRegisterInput = require('../validation/register');

//Doctor Register Auth
router.post("/register", function(req, res) {
	//Registration form validation
	const {errors, isValid} = validateRegisterInput(req.body);
	if (!isValid) {
		//Form validation errors
		req.flash("error", errors);
        res.redirect("/");
	}
	else {
		const newDoctor = new Doctor({
			profilePic: {
				data: fs.readFileSync('./public/images/doctor.png'),
				contentType: 'image/png'
			},
			name: req.body.name,
			username: req.body.username
		});
		Doctor.register(newDoctor, req.body.password, function(err, doctor){
	        if(err) {
	        	//Database error
	            req.flash("error", err.message);
	            res.redirect("/");
	        }
	        else {
	        	passport.authenticate("doctorLocal")(req, res, function(){
	        		//Auto-login after registration
		            req.login(doctor, function (error) {
		                if (error) {
		                    req.flash("error", error.message);
		            		res.redirect("/");
		                } 
		                else {
		                    req.flash("success", "Successfully registered!!");
		                    res.redirect("/dashboardDoc"); 
		                }
		            });
	        	});
	        }
	    });
	}
});

//Doctor Login Auth
router.post("/login", passport.authenticate('doctorLocal', {
	successRedirect: '/dashboardDoc',
    failureRedirect: '/',
    failureFlash: true
}));

module.exports = router;
