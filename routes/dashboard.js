/*eslint-env node */
var express = require('express');
var router = express.Router();

//models
var employee = require('../models/employee');

/**
 * Returns all employees from db
 */
router.get('/', function(req, res, next) {
	employee.find({}, function(err, emp){
		if(err){ res.render("error"); }
		else {
			console.log("Rendering dashboard page...");
			res.render("dashboard", { title: "EDMS", employees: emp, user: req.session.user});
		}
	});
});

/**
 * Returns employee by its name and password
 */
router.get('/findEmpByNameAndId', function(req, res, next){
	employee.find({username: req.query.name, password: req.query.pwd}, function(err, emp, next){
		if(err) res.json(err);
		else res.json(emp);
	});
});

module.exports = router;
