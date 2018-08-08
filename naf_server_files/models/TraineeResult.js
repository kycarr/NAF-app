var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var TraineeResultSchema = new Schema({

    testName: {
        type: String
    },

    className: {
        type: String
    },

    traineeResult: [{
        traineeName: {
            type: String
        },

        timeStarted: {
            type: String
        },

        timeCompleted: {
            type: String
        },

        attempts: {
            type: Number
        },

        totalScore: {
            type: String
        },

        result: {
            type: String
        },

        topics: [{
            label: String,
            score: Number,
            total: Number
        }]
    }]

});


var TraineeResult = mongoose.model('trainee_results', TraineeResultSchema);

module.exports = TraineeResult;