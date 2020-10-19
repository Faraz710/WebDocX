const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Doctor schema
const Doctor = require('../models/doctor_schema');

//Display doctors list based on page no.
router.get("/page/:page_no/*", function(req, res) {
	//Add filter params to query(if present)
	var query = {};
	if (req.query.speciality)
		query.speciality = req.query.speciality;
	if (req.query.name)
		query.name = req.query.name;
	if (req.query.lte)
		query.experience = { $lte: parseInt(req.query.lte), $gte: parseInt(req.query.gte)};

	Doctor.find(query, function(err, doctors){
		if(err) { 
            req.flash("error", err.message);
            res.redirect("/dashboardPat");
        }
        else {
        	//Count total no. of objects
        	Doctor.countDocuments(query, function(error, count){
        		if(err) { 
		            req.flash("error", err.message);
		            res.redirect("/dashboardPat");
		        }
		        else {
		        	var totalPages = Math.floor(count / 10) + 1;
		        	//Send page count along with doctors
		        	res.render("viewdocs", {docs: doctors, pageCount: totalPages, params: query});
		        }
        	});
        }
        //Skip previous profiles as per page no.
        //Limit to 9 profiles per page
	}).limit(9).skip(9 * (req.params.page_no - 1));
});

module.exports = router;