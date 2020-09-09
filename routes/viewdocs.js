const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Doctor schema
const Doctor = require('../models/doctor_schema');

//Display doctors list based on speciality
router.get("/:specialization", function(req, res) {
	Doctor.find({specialization:req.params.specialization}, function(err, doctors) {
		res.render("viewdocs",{docs:doctors});
	});
});

module.exports = router;