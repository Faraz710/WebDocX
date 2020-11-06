const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Consultation schema
const Consultation = require('../models/consultation_schema');

//Display chat heads
router.get("/", function(req, res) {
	Consultation.find({$or: [{doctor: req.user._id},{patient: req.user._id}], isAccepted: true}, {chat: 0})
	.populate('patient', 'name')
	.populate('doctor', 'name')
	.exec(function(err, consultations) {
		console.log(consultations);
		res.send(consultations)
	});
});

//Display entire chat consultation
router.get("/:consultationId", function(req, res) {
	Consultation.find({$or: [{doctor: req.user._id},{patient: req.user._id}], isAccepted: true})
	.populate('patient', 'name')
	.populate('doctor', 'name')
	.exec(function(err, consultation) {
		console.log(consultation);
		res.send(consultation)
	});
});

//Add new message
router.post("/:consultationId/new/message", function(req, res) {
	if (req.body.type == 'text') {
		const newMessage = {
			message: req.body.message,
			from: req.user._id,
		};
	}
	Consultation.findOneAndUpdate({_id: req.params.consultationId, $or: [{doctor: req.user._id},{patient: req.user._id}], isAccepted: true}, {
		$push: {
			chat: newMessage
		}
	}, function(err, consultation) {
		if (err) {
			console.log(err.message);
		}
		else {
			console.log(consultation);
			res.send("Success");
		}
	});
});

module.exports = router;