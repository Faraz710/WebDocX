const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Consultation schema
const Consultation = require('../models/consultation_schema');

//Display chat heads
router.get("/", function(req, res) {
	Consultation.find({$or: [{doctor: req.user._id},{patient: req.user._id}]}, {chat: 0})
	.populate('patient', 'name')
	.populate('doctor', 'name')
	.exec(function(err, consultations) {
		res.render('consultation', {consultations: consultations});
	});
});

//Display entire chat consultation
router.get("/:consultationId", function(req, res) {
	Consultation.findOne({_id: req.params.consultationId, $or: [{doctor: req.user._id},{patient: req.user._id}]})
	.populate('patient', 'name')
	.populate('doctor', 'name')
	.exec(function(err, consultation) {
		res.send(consultation);
	});
});

//Add new message
router.post("/:consultationId/new/message", function(req, res) {
	if (req.body.type == 'text') {
		const newMessage = {
			message: req.body.message,
			from: req.user._id
		};
	}
	else {
		const newMessage = {
			message: {
				data: req.files.message.data,
				type: req.files.message.mimetype
			},
			from: req.user._id
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