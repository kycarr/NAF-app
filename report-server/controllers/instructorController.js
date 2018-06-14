const mongoose = require ('mongoose');
const instructor_instance = require('../models/Instructor');

exports.instructor_info = function(req, res, next) {
	var id = mongoose.Types.ObjectId(req.query['id']);
	instructor_instance.findOne({ '_id': id }, function(err, instructor) {
		if(err){
			console.log("err" + err);
			return handleError(err);
		}
		else if(!instructor) {
			res.send("instructor of id '" + id + "' is not found");
		}
		else{
			console.log("getting info of: " + instructor.name);
			console.log(instructor);
			res.json(instructor);
		}
	});
}

//if the first name and last name matches then there is a duplicate
exports.create_instructor = function(req, res) {
	let myId = mongoose.Types.ObjectId();
	var classes = req.body.classNames;
	var name = req.body.firstName + " " + req.body.lastName;
	instructor_instance.findOne({ name: name }, function(err, user) {
		if(err){
			console.log(err);
			res.send("error");
		}
		if(user) {
			res.send("instructor " + name + " already exists");
		}
		else {
			instructor_instance.create({_id: myId, name: name, class_names: classes}, function(err) {
				if(err){
					console.log(err);
					res.send("error");
				}
				else {
					console.log("success, user " + name + " has been added to db");
					res.send("success, user " + name + " has been added to db");
				}
			});
		}
	});


}