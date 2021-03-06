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

router.get("/dashboard", function(req, res) {
	Consultation.find({$or: [{doctor: req.user._id},{patient: req.user._id}]}, {chat: 0})
	.populate('patient', 'name')
	.populate('doctor', 'name')
	.exec(function(err, consultations) {
		res.send(consultations);
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
		var newMessage = {
			message: req.body.message,
			from: req.user._id
		};
	}
	else {
		var newMessage = {
			message: {
				data: req.files.message.data,
				type: req.files.message.mimetype
			},
			type:'image',from: req.user._id
		};
	}
	console.log(newMessage);
	Consultation.findOneAndUpdate({_id: req.params.consultationId, $or: [{doctor: req.user._id},{patient: req.user._id}], isAccepted: true}, {
		$push: {
			chat: newMessage
		}
	}, function(err, consultation) {
		if (err) {
			console.log(err.message);
			res.send("Error");
		}
		else {
			console.log(consultation);
			res.redirect('/consultation#'+consultation._id);
		}
	});
});

module.exports = router;