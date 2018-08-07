var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var TestResultSchema = new Schema({


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
    finished: {
        type: Number,
        min: 0
    },
    inComplete: {
        type: Number,
        min: 0
    },
    notStart: {
        type: Number,
        min: 0
    },
    average: {
        type: String,
    },
    pass: {
        type: String,
    },
    topics: [{
        label: String,
        pass: Number,
        fail: Number
    }]
});


var TestResult = mongoose.model('test_results', TestResultSchema);

module.exports = TestResult;