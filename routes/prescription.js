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
	Consultation.findOne({_id: req.params.consultationId})
				.populate('patient', 'name age sex')
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
							sex: consultation.patient.sex
						},
						symptoms: consultation.symptoms,
						description: consultation.description,
						diagnosis: req.body.diagnosis,
						//medicines: req.body.medicines,
						remarks: req.body.remarks
					});
					newPrescription.save().then(() => {
  						res.redirect('/view/'+newPrescription._id);
  					}).catch(err => {
  						req.flash("error", err.message);
  						res.redirect("/prescription/generate");
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
		            "height": "9.25in",
		            "width": "8.5in",
		            "header": {
		                "height": "2mm"
		            },
		            "footer": {
		                "height": "2mm",
		            },
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
				            	res.redirect("/prescription/generate");
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