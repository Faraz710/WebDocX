const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Doctor schema
const Doctor = require('../models/doctor_schema');
//Patient schema
const Patient = require('../models/patient_schema');

//Display doctor user details
router.get("/doctor/:id", function(req, res) {
	Doctor.findOne({_id:req.params.id}, function(err, account) {
		res.render("update",{myAccount: account});
	});
});

module.exports = router;