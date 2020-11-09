const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/authorisation.js');

//Consultation schema
const Consultation = require('../models/consultation_schema');
//Doctor schema
const Doctor = require('../models/doctor_schema');

//Send new consultation request
router.post("/new/:doctorId", auth.isPatient, function(req, res) {
	const newConsultation = new Consultation({
		problem: {
			issue: req.body.problem,
			tags: req.body.tags
		},
		symptoms: req.body.syms,
		description: req.body.description,
		doctor: req.params.doctorId,
		patient: req.user._id
	});
	newConsultation.save().then(() => {
		//Push a new notification for doctor
		const newNotification = {
			message: `You have received a new consultation request from ${req.user.name} regarding the problem: ${req.body.problem}. Kindly review it and respond to the patient.`,
			type: 3,
			url: 'http://localhost:3000/consultion#'+newConsultation._id
		};

		Doctor.findOneAndUpdate({_id: req.params.doctorId}, { 
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

//Turn consultation request to consultation when doctor accepts
router.post("/accept/:consultationId", auth.isDoctor, auth.isActivated, function(req, res) {
	Consultation.findOneAndUpdate({_id: req.params.consultationId, doctor: req.user._id}, {
			$set: 
			{
				isAccepted: true
			}
		}, function(err, consultation) {
		if (err) {
				req.flash("error", err.message);
            	res.redirect("/dashboardDoc");
		}
		else {
			//Notify patient about accepted consultation
			const newNotification = {
				message: `Your consultation request to Dr. ${req.user.name} regarding the problem: ${consultation.problem.issue} has been accepted. You can now contact the doctor and seek consultation.`,
				type: 1,
				url: 'http://localhost:3000/consultation#'+consultation._id
			};

			Patient.findOneAndUpdate({_id: consultation.patient}, { 
				$push: {
					notifications: newNotification 
				}
			}, function(err, patient) {
				if (err) {
					req.flash("error", err.message);
	  				res.redirect('/dashboardDoc');
				}
				else {
					res.redirect('/consultation#'+consultation._id);
				}
			});
		}
	});
});

//Delete consultation when doctor rejects consultation request
router.delete("/reject/:consultationId", auth.isDoctor, auth.isActivated, function(req, res) {
	Consultation.findOneAndRemove({_id: req.params.consultationId, doctor: req.user._id}, function(err, consultation) {
		if (err || !consultation) {
			req.flash("error", err.message);
           	res.redirect("/dashboardDoc");
		}
		else {
			//Notify patient about rejected consultation
			const newNotification = {
				message: `Your consultation request to Dr. ${req.user.name} regarding the problem: ${consultation.problem.issue} has been rejected as it fell out of his scope. We suggest you request another doctor for consultation.`,
				type: 2
			};

			Patient.updateOne({_id: consultation.patient}, { 
				$push: {
					notifications: newNotification 
				}
			}, function(err, patient) {
				if (err) {
					req.flash("error", err.message);
	  				res.redirect('/dashboardDoc');
				}
				else {
					res.redirect('/consultion');
				}
			});
		}
	});
});

module.exports = router;