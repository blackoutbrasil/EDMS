var express = require('express');

var router = express.Router();

//models
var employee = require('../models/employee');

/**
 * Returns all employees from db
 */
router.get('/', function(req, res) {
	employee.find({}, function(err, emp){
		if(err){ res.json(err) }
		else res.json(emp);
	});
});

/**
 * Returns employee by its name and password
 */
router.get('/findEmpByNameAndPwd', function(req, res){
	employee.find({username: req.query.name, password: req.query.pwd}, function(err, emp){
		if(err) res.json(err);
		else res.json(emp);
	});
});

/**
 * Returns employee by its id
 */
router.get('/findEmpById/:id', function(req, res){
//	var ObjectId = require('mongoose').Schema.Types.ObjectId;
	employee.find({_id: new require('mongoose').Schema.Types.ObjectId(req.params.id)}, function(err, emp){
		if(err) {
			res.json(err);
		}
		else {
			console.log(req.params.id + " - " + emp);
			res.json(emp);
		}
	});
});

module.exports = router;
