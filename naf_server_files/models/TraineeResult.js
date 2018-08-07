var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var TraineeResultSchema = new Schema({

    user: {                     
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    testName: String,

    className: String,

    traineeName: String,

    timeStarted: String,

    timeCompleted: String,

    attempts: String,

    totalScore: String,

    result: String,

    topics: [{
        label: String,
        score: Number,
        total: Number
    }]
});


var TraineeResult = mongoose.model('test_results', TraineeResultSchema);

module.exports = TraineeResult;