/*eslint-env node */
var express = require('express');
var router = express.Router();

//models
var employee = require('../models/employee');

/* GET login page. */
router.get('/', function(req, res) {
	res.render('login', { title: "EDMS" });
});

/* POST login page. */
router.post('/', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	
	employee.findOne({username: username, password: password}, function(err, emp){
		if(err) res.json(err.errors.message);
		else {
			// Validates login rule - pre-defined user and pwd
			if(emp !== null){
				console.log(emp);
				req.session.user = emp;
				res.redirect("/employees/dashboard");
			} else {
				res.render("login", { title: "EDMS", message: "Login Failed" });
			}
		}
	});
});

module.exports = router;
