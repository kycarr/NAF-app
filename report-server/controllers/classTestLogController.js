const mongoose = require ('mongoose');
var classTestLog = require('../models/classTestLog');
"use strict";

exports.fetchClassTestLog = function(req, res) {
	var id = mongoose.Types.ObjectId(req.query['id']);
		var className = req.query['className'];
		var testName = req.query['testName'];
		console.log(req.query['id']);
		if(req.query['id'] !== undefined) {
			classTestLog.find({'_id' : id}, function(err, result) {
				if(err){
					console.log("err" + err);
					return handleError(err);
				}
				else if(!result) {
					res.send("Class test Log of id '" + id + "' is not found");
				}
				else{
					console.log(result);
					res.json(result);
				}
			});
		}
		else if(typeof className !== undefined && typeof testName !== undefined) {
			classTestLog.find({ $and: [ { className : className}, {testName: testName} ] }, function(err, result) {
				if(err){
					console.log("err" + err);
					return handleError(err);
				}
				else if(!result) {
					res.send("Class test log of class name '" + className + "' is not found");
				}
				else{
					console.log(result);
					res.json(result);
				}
			});
		}

}


//if the first name and last name matches then there is a duplicate

exports.createClassTestLog = function(req, res) {
	let myId = mongoose.Types.ObjectId();
	let traineeId = req.body.trainee_id;
	let className = req.body.className;
	let testName = req.body.testName;
	//find the user name by using id
	classTestLog.findOne({ $and: [ {trainee_id: traineeId}, {className: className}, {testName: testName} ] }, function(err, result) {
		if(err){
			console.log(err);
			res.send("error");
		}
		if(result) {
			res.send("Test Log for class: " + className + " test: " + testName + " trainee: " + traineeId + " already exists");
		}
		else {
			classTestLog.create({_id: myId, trainee_id: traineeId, className: className, testName: testName}, function(err) {
				if(err){
					console.log(err);
					res.send("error");
				}
				else {
					console.log("success, Test Log for class: " + className + " test: " + testName + " trainee: "
						+ traineeId + "has been added to db");
					res.send("success, Test Result for class: " + className + " test: " + testName + " trainee: "
						+ traineeId + "has been added to db");
				}
			});
		}
	});
}