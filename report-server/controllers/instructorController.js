const mongoose = require ('mongoose');
var instructor_instance = require('../models/instructor');
var async = require('async');

exports.instructor_info = function(req, res, next) {
	var id = mongoose.Types.ObjectId(req.query['id']);
	Instructor.findOne({ '_id': id }, function(err, instructor) {
		if(err){
			console.log("err" + err);
			return handleError(err);
		}
		else{
			console.log(instructor);
			return instructor;
		}
	});
}


exports.create_instructor = function(req, res, next) {
	console.log(req.body);
	var firstName = req.body.firstName;
	console.log(firstName);
	var lastName = req.body.lastName;
	var classes = req.body.classes;
	instructor_instance.create( function(err) {
		if(err) return handleError(err);
	});
}