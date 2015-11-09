/*eslint-env node */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EDMS', link: "/login", user: req.session.user });
});

module.exports = router;
