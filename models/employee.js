var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
	_id: {type: Schema.Types.ObjectId},
	username:  {type: String, required: true, unique: true},
	firstname: {type: String, required: true},
	lastname:  {type: String, required: true},
	email: 	   {type: String, required: true},
	password:  {type: String, required: true}
});

module.exports = mongoose.model('employee', employeeSchema);