const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Consultation schema
const Consultation = require('../models/consultation_schema');

//Add new consultation
router.post("/:doctorId", function(req, res) {
	var initial_msg = `Hello Doctor, I'm having ${req.body.problem} problem. I'm having the following symptoms: ${req.body.syms}. Detailed description: ${req.body.description}.`
	var time = Date.now();
	const newConsultation = new Consultation({
		problem: {
			issue: req.body.problem,
			tags: req.body.tags
		},
		symptoms: req.body.syms,
		description: req.body.description,
		doctorId: req.params.doctorId,
		patientId: req.user,
		messages: {"message": initial_msg,"time": time}
	});
	newConsultation.save().then(() => {
										req.flash("success", "Consultation registered successfully!!");
  										res.redirect('/dashboardPat');
  						}).catch(err => {
  										req.flash("error", "Sorry, we failed to register the consultation!! Please try again after some time.");
  										res.redirect('/dashboardPat');
  	});
});

module.exports = router;