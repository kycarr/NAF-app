var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var classTestLogSchema = new Schema({

    traineeName: String,

    traineeId: ObjectId,

    timeStarted: String,

    timeCompleted: String,

    numAttempts: Number,

    totalScore: Number,

    Result: String,

    Topics: []
});


var classTestLog = mongoose.model('class_test_log', classTestLogSchema);

module.exports = classTestLog;