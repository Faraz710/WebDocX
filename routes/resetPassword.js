const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/authorisation.js');
const nodemailer = require('nodemailer');
const async = require('async');
const crypto = require('crypto');
const fs = require('fs');

//Doctor schema
const Doctor = require('../models/doctor_schema');
//Patient schema
const Patient = require('../models/patient_schema');

//Send password reset mail
router.post("/forgot/:collectionName", function(req, res) {
	//Run array of functions which return input for following function 
	async.waterfall([
	    function(done) {
	    	//Generate unique token
	    	crypto.randomBytes(20, function(err, buf) {
	        	var token = buf.toString('hex');
	        	done(err, token);
	      });
	    },
	    function(token, done) {
	    	if (req.params.collectionName == 'doctor')
	    		Collection = Doctor;
	    	else if (req.params.collectionName == 'patient')
	    		Collection = Patient;
	    	else
	    		return res.redirect("/error");

	    	Collection.findOne({ username: req.body.username }, function(err, user) {
		        if (!user) {
		        	req.flash("error", "No account with that email address exists!");
		        	return res.redirect("/");
		        }
		        //Set token expiry to 1 hr
		        user.resetPasswordToken = token;
		        user.tokenExpiry = Date.now() + 3600000;
		        user.save(function(err) {
		        	done(err, token, user);
		        });
		    });
	    },
	    function(token, user, done) {
		    var smtpTransport = nodemailer.createTransport({
		        service: 'Gmail',
		        auth: {
		        	user: process.env.MAIL_USERNAME,
		        	pass: process.env.MAIL_PASSWORD
		        }
		    });
		    var mailOptions = {
		        to: user.username,
		        from: 'WebDocX Team <' + process.env.MAIL_USERNAME + '>',
		        subject: 'WebDocX Password Reset',
		        html: '<h2>Reset Password</h2>' +
		        	'You are receiving this because you (or someone else) have requested the reset of the password for your account. The password reset window is limited to one hour. Please click on the following link, or paste this into your browser to complete the process:<br><br>' +
			        'http://' + req.headers.host + '/reset/' + req.params.collectionName + '/' + token + '<br><br>' +
			        'If you did not request this, please ignore this email and your password will remain unchanged.<br><br>' +
			        'Thanks,<br>' +
			        'WebDocX team<br><br>' +
			        'Username: ' + req.body.username + '<br>' +
			        'IP Address: ' + req.headers['x-forwarded-for'] || req.connection.remoteAddress + '<br>'
			};
		    smtpTransport.sendMail(mailOptions, function(err) {
		      	req.flash("success", "An e-mail has been sent to " + user.username + " with further instructions to reset the password");
		        done(err, 'done');
		    });
	    }
	], function(err) {
		if (err) 
			req.flash("error", err.message);
    	res.redirect("/");
	});
});

//Display password reset form for doctors
router.get("/doctor/:token", function(req, res) {
	Doctor.findOne({resetPasswordToken: req.params.token, tokenExpiry: {$gt: Date.now()}}, function(err, doctor) {
		if (!doctor) {
			//Redirect to homepage if token has expired
			req.flash("error", "Password reset token is invalid or has expired!");
            res.redirect("/");
		}
		else {
			res.render("resetPassword", {account: doctor, category: 'doctors'});
		}
	});
});

//Display password reset form for patients
router.get("/patient/:token", function(req, res) {
	Patient.findOne({resetPasswordToken: req.params.token, tokenExpiry: {$gt: Date.now()}}, function(err, patient) {
		if (!patient) {
			//Redirect to homepage if token has expired
			req.flash("error", "Password reset token is invalid or has expired!");
            res.redirect("/");
		}
		else {
			res.render("resetPassword", {account: patient, category: 'patients'});
		}
	});
});

//Request to update password for doctors
router.post("/:collectionName/:token", function(req, res) {
	async.waterfall([
	    function(done) {
	    	if (req.params.collectionName == 'doctor')
	    		Collection = Doctor;
	    	else if (req.params.collectionName == 'patient')
	    		Collection = Patient;
	    	else
	    		return res.redirect("/error");

	      	Collection.findOne({ resetPasswordToken: req.params.token, tokenExpiry: { $gt: Date.now() } }, function(err, user) {
		        if (!user) {
		        	req.flash("error", "Password reset token is invalid or has expired!");
		        	return res.redirect("/");
		        }

		        user.resetPasswordToken = undefined;
		        user.tokenExpiry = undefined;
		        user.setPassword(req.body.password, function() {
		        	user.save(function(err) {
		        		done(err, user);
		        	});
		        });
	      	});
	    },
	    function(user, done) {
		    var smtpTransport = nodemailer.createTransport({
		        service: 'Gmail',
		        auth: {
		        	user: process.env.MAIL_USERNAME,
		        	pass: process.env.MAIL_PASSWORD
		        }
		    });
		    var mailOptions = {
		        to: user.username,
		        from: 'WebDocX Team <' + process.env.MAIL_USERNAME + '>',
		        subject: 'WebDocX Password Reset Confirmation',
		        html: '<h2>Password Change Confirmation</h2>' +
		        	'Your password was successfully changed.<br><br>' +
			        'Username: ' + user.username + '<br>' +
			        'IP Address: ' + req.headers['x-forwarded-for'] || req.connection.remoteAddress + '<br><br>' +
			        'Thanks,<br>' +
			        'WebDocX team<br>'
			};
		    smtpTransport.sendMail(mailOptions, function(err) {
		      	req.flash("success", "Your password has been changed successfully!");
		        done(err, 'done');
		    });
	    }
  	], function(err) {
  		if (err) 
			req.flash("error", err.message);
    	res.redirect("/");
  	});
});

module.exports = router;