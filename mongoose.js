var mongoose = require('mongoose');
var appEnv = require('cfenv');

var url = appEnv.url || "localhost";
mongoose.connect('mongodb://' + url + '/edmsdb' );

module.exports = mongoose;
