const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const pdf = require("html-pdf");
const fs = require("fs");

//Prescription schema
const Prescription = require('../models/prescription_schema');
//Consultation schema
const Consultation = require('../models/consultation_schema');

//Display form for doctor to fill prescription details
router.get("/generate/:consultationId", function(req, res) {
	res.render("prescriptionForm", {consultationId: consultationId});
});

//Store prescription details and display
router.post("/generate/:consultationId", function(req, res) {
	var det = JSON.parse(req.body.details);
	console.log(det);
	Consultation.findOne({_id: req.params.consultationId})
				.populate('patient', 'name age gender')
				.populate('doctor', 'name qualification reg_no')
				.exec(function(err, consultation) {
					console.log(det);
					const newPrescription = new Prescription({
						doctor: {
							name: consultation.doctor.name,
							qualification: consultation.doctor.qualification,
							reg_no: consultation.doctor.reg_no,
							digitalSign: {
								data: req.files.sign.data,
								contentType: req.files.sign.mimetype
							}
						},
						patient: {
							_id: consultation.patient._id,
							name: consultation.patient.name,
							age: consultation.patient.age,
							gender: consultation.patient.gender
						},
						symptoms: consultation.symptoms,
						description: consultation.description,
						diagnosis: det.diagnosis,
						medicines: det.medicines,
						remarks: det.remarks
					});
					console.log(newPrescription);
					newPrescription.save().then(() => {
  						res.send(newPrescription._id);
  					}).catch(err => {
  						res.send("error");
  					});
  				});
});

//Display prescription
router.get("/view/:prescriptionId", function(req, res) {
	Prescription.findOne({_id: req.params.prescriptionId}, function(err, prescription) {
		const logo = fs.readFileSync('./public/images/logo.png').toString('base64');
		res.render("prescriptionTemplate", {prescription: prescription, logoBuffer: logo}, (err, template) => {
			if (err) {
		        req.flash("error", err.message);
				res.redirect("/prescription/generate");
		    } 
		    else {
		    	const options = {
		            "height": "10.5in",
					"margin-bottom": "0in",
		            "width": "8in"
		        };
		        pdf.create(template, options).toBuffer(function(err, buffer) {
				 	Prescription.updateOne({_id: req.params.prescriptionId}, {
							$set: 
							{
								pdf: {
									data: buffer,
									contentType: 'application/pdf'
								}
							}
						}, function(err, prescription) {
							if (err) {
								req.flash("error", err.message);
								console.log(err);
				            	res.redirect("/consultation");
							}
							else {
								console.log("success");
								req.flash("success", "Sent the prescription successfully!!");
				  				res.redirect('/dashboardDoc');
						}
					});
				});
		    }
		});
	});
});

module.exports = router;