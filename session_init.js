/*eslint-env node */
// Dependencies
var session 	= require('client-sessions');

//models
var employee = require('./models/employee');

module.exports = {
	/* Initialize the session */
	init: session({
		cookieName: 'session',
		secret: 'edmssessionsecret',
		duration: 30 * 60 * 1000,
		activeDuration: 5 * 60 * 1000,
	}),
	
	/* Verifies if session is valid and set the user in it */
	setUser: function(req, res, next) {
		if (req.session && req.session.user) {
			employee.findOne({ username: req.session.user.username }, function(err, user) {
				if (user) {
					req.user = user;
					req.user.password = ""; // delete the password from the user object
					req.session.user = user;  //refresh the session value
					res.locals.user = user;
				}
				// finishing processing the middleware and run the route
				next();
			});
		} else {
			console.log("Session not valid!");
			next();
		}
	},

	/* Verifies if user is logged in, if doesn't, redirects to login page */
	requireLogin: function(req, res, next) {
		if (!req.user) {
			console.log("User not logged in, redirecting to login page...");
			res.redirect('/login');
		} else {
			next();
		}
	}
}