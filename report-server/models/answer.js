var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var answerSchema = new Schema({

	user_id: ObjectId,

	section_id: ObjectId,

	question_id: ObjectId,

	answer: String

});


var answer = mongoose.model('answer', answerSchema);

module.exports = answer;