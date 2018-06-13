const mongoose = require ('mongoose');
var testResult = require('../models/testResult');

exports.fetchTestResult = function(req, res) {
	var id = mongoose.Types.ObjectId(req.query['id']);
	testResult.findOne({'_id' : id}, function(err, result) {
		if(err){
			console.log("err" + err);
			return handleError(err);
		}
		else if(!result) {
			res.send("testResult of id '" + id + "' is not found");
		}
		else{
			console.log(result);
			res.json(result);
		}
	});

}

//if the first name and last name matches then there is a duplicate
exports.createTestResult = function(req, res) {
	let myId = mongoose.Types.ObjectId();
	let className = req.body.className;
	let testName = req.body.testName;
	let dateCompleted = req.body.dateCompleted;
	let numFinished = req.body.numFinished;
	let numIncomplete = req.body.numIncomplete;
	let numNotStart = req.body.numNotStart;
	let numAveragePercent = req.body.numAveragePercent;
	let numPassPercent = req.body.numPassPercent;
	let topics = req.body.topics;
	testResult.findOne({ $and:[ {className: className}, {testName: testName} ] }, function(err, result) {
		if(err){
			console.log(err);
			res.send("error");
		}
		if(result) {
			res.send("success, Test Result for class: " + className + " test: " + testName + " already exists");
		}
		else {
			testResult.create({_id: myId, className, testName, dateCompleted, numFinished, numIncomplete,
			numNotStart, numAveragePercent, numPassPercent, topics}, function(err) {
				if(err){
					console.log(err);
					res.send("error");
				}
				else {
					console.log("success, Test Result for class: " + className + " test: " + testName + "has been added to db");
					res.send("success, Test Result for class: " + className + " test: " + testName + "has been added to db");
				}
			});
		}
	});
}