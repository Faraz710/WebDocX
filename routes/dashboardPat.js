const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');

//Post schema
const Post = require('../models/post_schema');

//Display patient dashboard
router.get("/", function(req, res) {
	res.render("dashboardPat");
});

router.post("/read/:id", function(req, res) {
	Patient.updateOne({_id: req.user._id, "notifications._id": req.params.id}, {
			$set: 
			{
				"notifications.$.seen": true
			}
		}, function(err, notif) {
			res.redirect("/dashboardPat");
	});
});

module.exports = router;