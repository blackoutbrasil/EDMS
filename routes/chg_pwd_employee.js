var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

//models
var employee = require('../models/employee');

/**
 * Get an employee by its id
 */
router.get('/:id', function(req, res){
	employee.findOne({_id: req.params.id}, function(err, emp){
		if(err){ res.render("error")}
		else {
			console.log(emp);
			res.render("chg_pwd_employee", {employee: emp});
		}
	});
});

/**
 * Edit password of an employee 
 */
router.post('/', function(req, res){
	console.log("POST...................")
	if(req.body.new_pwd === req.body.confirm_pwd){
		console.log("pwd ok...................")
		employee.findByIdAndUpdate(
				{_id: req.body.id, password: req.body.old_pwd}, 
				{ $set: { password: req.body.new_pwd}}, 
				function(err){
					if(err){ 
						console.log("error...................")
						res.render("error", message = "Error on update: " + err)
					}
					else {
						console.log("Document Updated. "); 
					}
				});
		
		res.redirect('/employees/dashboard');
	} else {
		console.log("diff pwd...................")
		res.render('chg_pwd_employee', {employee: req.session.user, message: "New Password and Confirm Password are differents!"});
	}
});

module.exports = router;
