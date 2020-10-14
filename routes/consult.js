const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Consultation schema
const Consultation = require('../models/consultation_schema');

const Doctor = require('../models/doctor_schema');

//Add new consultation
router.post("/:doctorId", function(req, res) {
	var initial_msg = `Hello Doctor, I'm having ${req.body.problem} problem. I'm having the following symptoms: ${req.body.syms}. Detailed description: ${req.body.description}.`
	var time = Date.now();
	//Save consultation
	const newConsultation = new Consultation({
		problem: {
			issue: req.body.problem,
			tags: req.body.tags
		},
		symptoms: req.body.syms,
		description: req.body.description,
		doctorId: req.params.doctorId,
		patientId: req.user._id,
		messages: {"message": initial_msg,"time": time}
	});
	newConsultation.save().then(() => {
		//Push a new notification for doctor
		const newNotification = {
			message: `You have received a new consultation request from ${req.user.name} regarding the problem: ${req.body.problem}. Kindly review it and respond to the patient.`
		};

		Doctor.updateOne({_id: req.params.doctorId}, { 
			$push: {
				notifications: newNotification 
			}
		}, function(err, doctor) {
			if (err) {
				req.flash("error", "Sorry, we failed to register the consultation!! Please try again after some time.");
  				res.redirect('/dashboardPat');
			}
			else {
				req.flash("success", "Consultation registered successfully!!");
				res.redirect('/dashboardPat');
			}
		});
  	}).catch(err => {
  		req.flash("error", "Sorry, we failed to register the consultation!! Please try again after some time.");
  		res.redirect('/dashboardPat');
  	});
});

//Delete consultation when doctor rejects consultation request
router.delete("/reject/:consultationId", function(req, res) {
	Consultation.findOneAndRemove({_id: req.params.consultationId, doctorId: req.user._id}, function(err, consultation) {
		if (err) {
			req.flash("error", err.message);
           	res.redirect("/dashboardDoc");
		}
		else {
			//Notify patient about rejected consultation
			const newNotification = {
				message: `Your consultation request to ${req.user.name} regarding the problem: ${req.problem.issue} has been rejected as it fell out of his scope. We suggest you request another doctor for consultation.`
			};
			console.log(newNotification);
			console.log(consultation);

			Patient.updateOne({_id: consultation.patientId}, { 
				$push: {
					notifications: newNotification 
				}
			}, function(err, patient) {
				if (err) {
					req.flash("error", "There was some error. Please try again after some time.");
	  				res.redirect('/dashboardDoc');
				}
				else {
					res.redirect('/dashboardDoc');
				}
			});
		}
	});
});

module.exports = router;