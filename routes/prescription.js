const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const pdf = require("html-pdf");
const fs = require("fs");
const async = require('async');

//Prescription schema
const Prescription = require('../models/prescription_schema');
//Consultation schema
const Consultation = require('../models/consultation_schema');

//Display form for doctor to fill prescription details
router.get("/generate/:consultationId", function(req, res) {
	res.render("prescriptionForm", {consultationId: consultationId});
});

//Store prescription details and generate prescription
router.post("/generate/:consultationId", function(req, res) {
	//Run array of functions which return input for following function 
	async.waterfall([
		//Retrieve data from consultation and store into prescription
	    function(done) {
			var det = JSON.parse(req.body.details);
			Consultation.findOne({_id: req.params.consultationId})
						.populate('patient', 'name age gender')
						.populate('doctor', 'name qualification reg_no')
						.exec(function(err, consultation) {
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
							newPrescription.save(function(err) {
					        	done(err, newPrescription);
					        });
  						});
  		},
  		//Render prescription and generate 
  		function(newPrescription, done) {
  			const logo = fs.readFileSync('./public/images/logo.png').toString('base64');
			res.render("prescriptionTemplate", {prescription: newPrescription, logoBuffer: logo}, (err, template) => {
				if (err) {
					done(err);
			    } 
			    else {
			    	const options = {
			            "height": "10.5in",
			            "width": "8in"
			        };
			        pdf.create(template, options).toBuffer(function(err, buffer) {
					 	if (err) {
							done(err);
					    } 
					    else {
					    	done(err, newPrescription, buffer);
					    }
					});
				}
  			});
  		},
  		//Store generated pdf
  		function(newPrescription, buffer, done) {
  			Prescription.updateOne({_id: newPrescription._id}, {
								$set: 
								{
									pdf: {
										data: buffer,
										contentType: 'application/pdf'
									}
								}
							}, function(err, prescription) {
								if (err) {
									done(err);
								}
								else {
									req.flash("success", "Sent the prescription successfully!!");
									done(null);
								}
  			});
  		},
  		//Mark consultation as solved
  		function(done) {
  			Consultation.updateOne({_id: req.params.consultationId}, {
								$set: 
								{
									isSolved: true
								}
							}, function(err, prescription) {
								if (err) {
									done(err);
								}
								else {
									done(null);
								}
  			});
  		}], function(err) {
				if (err) 
				{
					req.flash("error", err.message);
					res.send("error");
				}
		    	res.send('success');
			});
});

module.exports = router;