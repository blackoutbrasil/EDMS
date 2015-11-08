/*eslint-env node */
var mongoose = require('mongoose');
var cfenv = require('cfenv');

// VCAP_SERVICES variables
var appEnv = cfenv.getAppEnv();

console.log('####### mongodb-edms #########');
// get mongodb service as JSON
var ml = appEnv.getService('mongodb-edms');

var dbURI = 'mongodb://127.0.0.1:27017/' + 'edmsdb'; // For local testing

if (ml) {
	console.log("MongoDB service found........................");
	console.log("Mongo URL: " + ml.credentials.url);
	
	dbURI = ml.credentials.url;
} else {
	console.log("MongoDB Service not found....................");
}

// set up for mongoose connection
/*var db = mongoose.connection;
db.on('connecting', function() {
    console.log('connecting');
});

db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});
db.on('connected', function() {
    console.log('connected!');
});
db.once('open', function() {
    console.log('connection open');
});
db.on('reconnected', function () {
    console.log('reconnected');
});
db.on('disconnected', function() {
    console.log('disconnected');
    console.log('dbURI is: '+dbURI);
    mongoose.connect(dbURI, {server:{auto_reconnect:true, socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }}, replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }});
  });*/
console.log('dbURI is: ' + dbURI);

//mongoose.connect(dbURI, {server:{auto_reconnect:true}});
mongoose.connect(dbURI);

module.exports = mongoose;
