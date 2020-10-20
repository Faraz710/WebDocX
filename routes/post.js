const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/authorisation.js');

//Post schema
const Post = require('../models/post_schema');

//Consultation schema
const Consultation = require('../models/consultation_schema');

//Display all personal posts
router.get("/", auth.isDoctor, function(req, res) {
	Post.find({patientId: req.user._id}, function(err, posts){
		if(err) { 
            req.flash("error", err.message);
            res.redirect("/posts");
        }
        else {
		    res.render("posts", {posts: posts});
        }
	})
});

//Create new post
router.post("/new", auth.isPatient, function(req, res) {
	var time = Date.now();
	const newPost = new Post({
		title: req.body.title,
		tags: req.body.tags,
		speciality: req.body.speciality,
		symptoms: req.body.symptoms,
		description: req.body.description,
		patientId: req.user._id,
		patientName: req.user.name
	});
	newPost.save().then(() => {
							req.flash("success", "Posted successfully!!");
  							res.redirect('/posts');
  				}).catch(err => {
  							req.flash("error", "Sorry, we failed to post!! Please try again after some time.");
  							res.redirect('/posts');
  	});
});

//Delete post
router.delete("/delete/:postId", auth.isPatient, function(req, res) {
	Post.findOneAndRemove({_id: req.params.postId, patientId: req.user._id}, function(err, post) {
		if (err) {
			req.flash("error", err.message);
           	res.redirect("/posts");
		}
		else {
			req.flash("success", "Deleted post successfully!!");
  			res.redirect('/posts');
		}
	});
});


//Edit post
router.post("/edit/:postId", auth.isPatient, function(req, res) {
	Post.updateOne({_id: req.params.postId, patientId: req.user._id}, req.body, function(err, post) {
			if (err) {
				req.flash("error", err.message);
            	res.redirect("/posts");
			}
			else {
				req.flash("success", "Updated post successfully!!");
  				res.redirect('/posts');
			}
	});
});
/*
//Doctor accept problem post
router.post("/accept/:postId", auth.isDoctor, function(req, res) {
	const newConsultation = new Consultation({
		problem: {
			issue: req.body.title,
			tags: req.body.tags
		},
		symptoms: req.body.symptoms,
		description: req.body.description,
		doctorId: req.user._id,
		patientId: req.body.patientId
	});
	newConsultation.save().then(() => {
		//Notify patient about accepted consultation
		const newNotification = {
			message: `Your consultation post regarding the problem: ${req.body.problem.issue} has been accepted by ${req.user.name}. A new consultation has been established for you.`
		};

		Patient.updateOne({_id: req.body.patientId}, { 
			$push: {
				notifications: newNotification 
			}
		}, function(err, patient) {
			if (err) {
				req.flash("error", err.message);
	  			res.redirect('/dashboardDoc');
			}
		});
		Post.findOneAndRemove({_id: req.params.postId}, function(err, post) {
			if (err) {
				req.flash("error", err.message);
	  			res.redirect('/dashboardDoc');
			}
			else {
				res.redirect('/dashboardDoc');
			}
		});
	}).catch(err => {
  		req.flash("error", err.message);
	    res.redirect("/dashboardDoc");
  	});
});*/

module.exports = router;