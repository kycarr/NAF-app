var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var ClassTestLogSchema = new Schema({


    class: {                     
        type: Schema.Types.ObjectId,
        ref: 'Class'
    },
    
	className: String,

	testName: String,

    dateCompleted: String,

    averageScore: Number,

    pass: Number,

    attempts: Number,

    finished: Number,

    Incomplete: Number,

    noStart: Number

});


var ClassTestLog = mongoose.model('class_test_log', ClassTestLogSchema);

module.exports = ClassTestLog;