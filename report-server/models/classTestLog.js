var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var classTestLogSchema = new Schema({

    trainee_id: ObjectId,

	className: String,

	testName: String,

    traineeName: String,

    timeStarted: String,

    timeCompleted: String,

    numAttempts: Number,

    totalScore: Number,

    result: String,

    topics: [{
    	name: String,
    	score: Number
    }]
});


var classTestLog = mongoose.model('class_test_log', classTestLogSchema);

module.exports = classTestLog;