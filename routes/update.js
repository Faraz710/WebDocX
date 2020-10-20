const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Doctor schema
const Doctor = require('../models/doctor_schema');
//Patient schema
const Patient = require('../models/patient_schema');

//Display doctor user details
router.get("/", function(req, res) {
	Doctor.findOne({_id:req.user._id}, function(err, account) {
		if(err) { 
            req.flash("error", err.message);
            res.redirect("/dashboardDoc");
        }
        else {
        	//Send account object with request
        	res.render("update", {myAccount: account});
        }
	});
});

//Update patient profile pic
router.post("/profilePic", function(req, res) {
	Patient.updateOne({_id: req.user._id}, {
			$set: 
			{
				profilePic: {
					data: req.files.profilepic.data,
					contentType: req.files.profilepic.mimetype
			}}
		}, function(err, account) {
			if (err) {
				req.flash("error", err.message);
            	res.redirect("/dashboardPat");
			}
			else {
				req.flash("success", "Updated profile picture successfully!!");
  				res.redirect('/dashboardPat');
		}
	});
});

//Update doctor profile pic
router.post("/profilePic", function(req, res) {
	Doctor.updateOne({_id: req.user._id}, {
			$set: 
			{
				profilePic: {
					data: req.files.profilepic.data,
					contentType: req.files.profilepic.mimetype
			}}
		}, function(err, account) {
			if (err) {
				req.flash("error", err.message);
            	res.redirect("/update");
			}
			else {
				req.flash("success", "Updated profile picture successfully!!");
  				res.redirect('/update');
		}
	});
});

//Update doctor info
router.post("/", function(req, res) {
	Doctor.updateOne({_id: req.user._id}, { 
		$set: 
		{
			name: req.body.name,
			qualification: req.body.qualification,
			speciality: req.body.speciality,
			experience: req.body.experience,
			reg_no: req.body.reg_no,
			license: {
				data: req.files.license.data,
				contentType: req.files.license.mimetype
			},
			home: {
				address: req.body.address,
				city: req.body.city,
				country: req.body.country,
			},
			phoneNumber: req.body.phoneNumber
		}}, function(err, account) {
			if (err) {
				req.flash("error", err.message);
            	res.redirect("/update");
			}
			else {
				req.flash("success", "Updated profile data successfully!!");
  				res.redirect('/update');
			}
	});
});


module.exports = router;