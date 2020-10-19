const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Post schema
const Post = require('../models/post_schema');

//Display all personal posts
router.get("/", function(req, res) {
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
router.post("/new", function(req, res) {
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
router.delete("/delete/:postId", function(req, res) {
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
router.post("/edit/:postId", function(req, res) {
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

module.exports = router;