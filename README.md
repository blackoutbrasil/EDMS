# EDMS

This app is intended to be a sample app for Node.js beginners.  
This sample runs on Bluemix environment

The app is basically a CRUD app for employee management using `Express` and `MongoDB` with `Mongoose`, between other things, including:
	
  * Create, remove, update and delete an employee (CRUD)
  * Login with session handling
  * Features that appear just for admin user
    * Add new employee by uploading a excel file
    * View audit log (not implemented, so feel free...)
  * Dashboard view
  * Sign up

## Installation

```sh
$ npm install
```

## Quick Start
This sample runs on Bluemix, however if you run it locally, don't forget to initialize MongoDB.

```sh
$ mongod -dbpath <your_mongodb_path>\data --journal
```

And then:

```sh
$ node app.js
```


This app is using the following modules:

  * [body-parser](https://github.com/expressjs/body-parser/blob/master/README.md)
  * [client-sessions](https://github.com/mozilla/node-client-sessions/blob/master/README.md)
  * [formidable](https://github.com/felixge/node-formidable/blob/master/Readme.md)
  * [fs-extra](https://github.com/jprichardson/node-fs-extra/blob/master/README.md)
  * [express](https://github.com/expressjs)
  * [mongoose](https://github.com/Automattic/mongoose/blob/master/README.md)
  * [node-xlsx](https://github.com/mgcrea/node-xlsx/blob/master/readme.md)


## Authors

**Rafael Teixeira da Costa**

+ http://github.com/blackoutbrasil

## License

MIT
