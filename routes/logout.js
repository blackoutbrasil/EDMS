/*eslint-env node */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	req.session.reset();
	res.redirect('/');
});

module.exports = router;
