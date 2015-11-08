/*eslint-env node */
// dependencies
var express 	= require('express');
var path 		= require('path');
var bodyParser 	= require('body-parser');
var cfenv 		= require('cfenv');
var debug 		= require('debug')('EDMS:server');
var http 		= require('http');
var session		= require('./session_init');

// routes
var index 			= require('./routes/index');
var login 			= require('./routes/login');
var logout 			= require('./routes/logout');
var employees 		= require('./routes/list_employees');
var new_employee 	= require('./routes/new_employee');
var del_employee 	= require('./routes/del_employee');
var edit_employee 	= require('./routes/edit_employee');
var view_employee 	= require('./routes/view_employee');
var chg_pwd_employee= require('./routes/chg_pwd_employee');
var dashboard 		= require('./routes/dashboard');
var upload	 		= require('./routes/upload');

// instantiate express app globally (without var)
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// logging
app.use(function(req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
});

/* Initialize session and set to the app */
app.use(session.init);
/* Verifies the user session */
app.use(session.setUser);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/employees', employees);
app.use('/employees/new', new_employee);
app.use('/employees/delete', session.requireLogin, del_employee);
app.use('/employees/edit', session.requireLogin, edit_employee);
app.use('/employees/view', session.requireLogin, view_employee);
app.use('/employees/change_pwd', session.requireLogin, chg_pwd_employee);
app.use('/employees/dashboard', session.requireLogin, dashboard);
app.use('/employees/upload', session.requireLogin, upload);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(appEnv.port, appEnv.bind, function() {
    console.log("server starting on " + appEnv.url);
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof appEnv.port === 'string'
    ? 'Pipe ' + appEnv.port
    : 'Port ' + appEnv.port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
	debug("Listening..");
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


module.exports = app;
