var express = require('express');
var formidable = require('formidable'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra'); // handle file manipulation
var mongoose = require('mongoose');

var xlsx = require('node-xlsx');
var router = express.Router();

//models
var employee = require('../models/employee');

/* GET page. */
router.get('/', function(req, res) {
	res.render('upload', { title: "EDMS" });
});

router.post('/', function(req, res, next) {
	var form = new formidable.IncomingForm();
    //Formidable uploads to operating systems tmp dir by default
    form.uploadDir = "./public";       //set upload directory
    form.keepExtensions = true;     //keep file extension

    form.parse(req, function(err, fields, files) {
        console.log("form.bytesReceived");
        //TESTING
        /*console.log("file size: "+JSON.stringify(files.fileUploaded.size));
        console.log("file path: "+JSON.stringify(files.fileUploaded.path));
        console.log("file name: "+JSON.stringify(files.fileUploaded.name));
        console.log("file type: "+JSON.stringify(files.fileUploaded.type));
        console.log("lastModifiedDate: "+JSON.stringify(files.fileUploaded.lastModifiedDate));
         */
        
        //Formidable changes the name of the uploaded file
        //Rename the file to its original name
        fs.rename(files.fileUploaded.path, './public/' + files.fileUploaded.name, function(err) {
	        if (err)
	            throw err;
	        console.log('renamed complete');  
	        var filePath = path.normalize(path.join(__dirname, ".."));
	        var file = path.join(filePath, "public", files.fileUploaded.name);
	        var employees = xlsx.parse(fs.readFileSync(file)); // parses a buffer

	        var returnErrorMessage = "";
	        var empList = employees[0].data;
	        for(i=1; i < empList.length; ++i){ // starts in 1 because the first position of the file [0] is the header content
	        	// instantiate the employee
	        	new employee({
        		_id 	 : new mongoose.Types.ObjectId,
        		username : empList[i][0],
        		firstname: empList[i][1],
        		lastname : empList[i][2],
        		email	 : empList[i][3],
        		password : empList[i][4]
	        	}).save(function(err, emp) {
	        		if(err){ 
	        			console.log("Ocorreu um erro no upload: " + JSON.stringify(err));
	        		} 
	        	});
	        }
        });
        
        res.redirect('/employees/dashboard/');
    });

});

module.exports = router;
