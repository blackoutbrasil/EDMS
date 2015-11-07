/*eslint-env node */
var mongoose = require('mongoose');
var cfenv = require('cfenv');

var appEnv = cfenv.getAppEnv();
//var envVars = appEnv.getEnvVars();

console.log(appEnv);

var dbURI = 'mongodb://127.0.0.1:27017/' + 'edmsdb'; // For local testing

console.log("process env: " + process.env);
if (process.env.VCAP_SERVICES) {
  var env = JSON.parse(process.env.VCAP_SERVICES);
  console.log(env);
  if (env.mongolab) { // for mongolabs
    var ml = env.mongolab;
	dbURI = ml[0].credentials.uri;
  }
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

mongoose.connect(dbURI, {server:{auto_reconnect:true}});

module.exports = mongoose;
