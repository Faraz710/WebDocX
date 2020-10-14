const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Post schema
const Post = require('../models/post_schema');

//Display patients' posts
router.get("/", function(req, res) {
	Post.find({}, function(err, posts){
		if(err) { 
            req.flash("error", err.message);
            res.render("dashboardDoc");
        }
        else {
        	res.render("dashboardDoc", {posts: posts});
        }
	})
});

module.exports = router;