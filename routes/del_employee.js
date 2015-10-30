var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

//models
var employee = require('../models/employee');

/**
 * Delete an employee by its id
 */
router.delete('/:id', function(req, res){
	employee.find({_id: req.params.id}).remove().exec();
	res.redirect("/employees/dashboard");
});

/**
 * Delete an employee by its id by POST request as by delete request isn't working
 */
router.post('/:id', function(req, res){
	employee.find({_id: req.params.id}).remove().exec();
	res.redirect("/employees/dashboard");
});

module.exports = router;
