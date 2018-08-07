var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var ClassTestLogSchema = new Schema({

	className: String,

	testName: String,

    dateCompleted: String,

    average: String,

    pass: String,

    attempts: Number,

    finished: Number,

    inComplete: Number,

    notStart: Number,
    

});


var ClassTestLog = mongoose.model('class_test_log', ClassTestLogSchema);

module.exports = ClassTestLog;