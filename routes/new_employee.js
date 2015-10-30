var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

//models
var employee = require('../models/employee');

/* GET signup page. */
router.get('/', function(req, res) {
	res.render('new_employee');
});

/* POST signup page. */
router.post('/', function(req, res) {
	// Validates passwords 
	if(req.body.rpassword === req.body.password){
		id = new mongoose.Types.ObjectId;
		// instantiate the employee
		new employee({
			_id 	 : id,
			username : req.body.username,
			firstname: req.body.firstname,
			lastname : req.body.lastname,
			email	 : req.body.email,
			password : req.body.password
		}).save(function(err, emp) {
			if(err){ 
				res.render("new_employee", { title: "EDMS", message: err.errors.message });
			} else {
				res.redirect("/login");
			}
		});
		
	} else {
		res.render("new_employee", { title: "EDMS", message: "Passwords must match!" });
	}
	
});

module.exports = router;
