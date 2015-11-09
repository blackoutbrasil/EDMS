/*eslint-env node */
var express = require('express');
var router = express.Router();

//models
var employee = require('../models/employee');

/**
 * Get an employee by its id
 */
router.get('/:id', function(req, res){
	employee.findOne({_id: req.params.id}, function(err, emp){
		if(err){ res.render("error");}
		else {
			console.log(emp);
			res.render("edit_employee", {employee: emp});
		}
	});
});

/**
 * Edit an employee by its id
 */
router.post('/', function(req, res){
	employee.findByIdAndUpdate(
			{_id: req.body.id}, 
			{ $set: { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email }}, 
			function(err){
				if(err){ res.render("error", {message: "Error on update: " + err} );}
				else {console.log("Document Updated. "); }
			});
	
	res.redirect('/employees/dashboard');
});

module.exports = router;
