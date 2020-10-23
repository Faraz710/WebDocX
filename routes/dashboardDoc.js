const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');

//Post schema
const Post = require('../models/post_schema');

//Display posts with doctor's speciality/ no speciality specified
router.get("/", function(req, res) {
	Post.find({$or: [{speciality:req.user.speciality},{speciality: {$exists: false}}]}, function(err, posts){
		if(err) { 
            req.flash("error", err.message);
            res.render("dashboardDoc");
        }
        else {
        	res.render("dashboardDoc", {posts: posts});
        }
	});
});

router.post("/read/:id", function(req, res) {
	Doctor.updateOne({_id: req.user._id, "notifications._id": req.params.id}, {
			$set: 
			{
				"notifications.$.seen": true
			}
		}, function(err, notif) {
			res.redirect("/dashboardDoc");
	});
});

module.exports = router;