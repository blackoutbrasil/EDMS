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
			res.render("view_employee", {employee: emp, user: req.session.user});
		}
	});
});

module.exports = router;
