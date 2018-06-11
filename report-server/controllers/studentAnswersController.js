const mongoose = require ('mongoose');
const async = require('async');
var answer = require('../models/answer');
var items = require('../models/items');

exports.fetchStudentAnswers = function(req, res) {
	user_id = req.query['user_id'];
	answer.find( { user_id }, function(err, result) {
		if(err){
			console.log("err" + err);
			return handleError(err);
		}
		else if(!result) {
			res.send("student of id '" + id + "' is not found");
		}
		else {
			let query = result.map(element => {
			 	let correctAnswer = items.findOne( {items_id: element.question_id}, function(err, result) {
					if(err){
						console.log("err" + err);
						return null;
					}
					else if(!result) {
						console.log("question_id answer not found");
						return null;
					}
					else {
						return result;
					}
				});
				let answer = element.answer;
				//response also counts need to work on that
				return {'answer': answer, 'correctAnswer': correctAnswer};
			});
			res.json(query);
		}
	});
}