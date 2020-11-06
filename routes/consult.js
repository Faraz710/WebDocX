const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/authorisation.js');

//Consultation schema
const Consultation = require('../models/consultation_schema');
//Doctor schema
const Doctor = require('../models/doctor_schema');

//Display requests
router.get("/request/:consultationId", function(req, res) {
	Consultation.find({doctor: req.user._id, isAccepted: false}, function(err, consultations) {
		if(err) { 
            req.flash("error", err.message);
            res.redirect("/dashboardDoc");
        }
        else {
        	res.send(consultations);
        }
	});
});

//Display consultations
router.get("/:consultationId", function(req, res) {
	Consultation.find({doctor: req.user._id, isAccepted: true}, function(err, consultations) {
		if(err) { 
            req.flash("error", err.message);
            res.redirect("/dashboardDoc");
        }
        else {
        	res.send(consultations);
        }
	});
});

//Send new consultation request
router.post("/request/new/:doctorId", auth.isPatient, function(req, res) {
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
			message: `You have received a new consultation request from ${req.user.name} regarding the problem: ${req.body.problem}. Kindly review it and respond to the patient.`
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
router.post("/request/accept/:consultationId", auth.isDoctor, auth.isActivated, function(req, res) {
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
				message: `Your consultation request to Dr. ${req.user.name} regarding the problem: ${consultation.problem.issue} has been accepted. You can now contact the doctor and seek consultation.`
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
					res.redirect('/dashboardDoc');
				}
			});
		}
	});
});

//Delete consultation when doctor rejects consultation request
router.delete("/request/reject/:consultationId", auth.isDoctor, auth.isActivated, function(req, res) {
	Consultation.findOneAndRemove({_id: req.params.consultationId, doctor: req.user._id}, function(err, consultation) {
		if (err || !consultation) {
			req.flash("error", err.message);
           	res.redirect("/dashboardDoc");
		}
		else {
			//Notify patient about rejected consultation
			const newNotification = {
				message: `Your consultation request to Dr. ${req.user.name} regarding the problem: ${consultation.problem.issue} has been rejected as it fell out of his scope. We suggest you request another doctor for consultation.`
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
					res.redirect('/dashboardDoc');
				}
			});
		}
	});
});

module.exports = router;