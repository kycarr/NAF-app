var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var testResultSchema = new Schema({

    className: {
        type: String,
        required: true
    },
    testName: {
        type: String,
        required: true
    },
    dateCompleted: {
        type: String,
    },
    numFinished: {
        type: Number,
        min: 0
    },
    numIncomplete: {
        type: Number,
        min: 0
    },
    numNotStart: {
        type: Number,
        min: 0
    },
    numAveragePercent: {
        type: Number,
        min: 0,
        max: 1
    },
    numPassPercent: {
        type: Number,
        min: 0,
        max: 1
    },
    classTestLog: {
        type: ObjectId,
        ref: 'classTestLog'
    },
    topics: [{
        name: String,
        pass: Number,
        fail: Number
    }]
});


var testResult = mongoose.model('test_results', testResultSchema);

module.exports = testResult;