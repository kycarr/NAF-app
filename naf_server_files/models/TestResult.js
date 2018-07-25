var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var TestResultSchema = new Schema({

    test: {                     
        type: Schema.Types.ObjectId,
        ref: 'Test'
    },

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
    topics: [{
        name: String,
        pass: Number,
        fail: Number
    }]
});


var TestResult = mongoose.model('test_results', TestResultSchema);

module.exports = TestResult;