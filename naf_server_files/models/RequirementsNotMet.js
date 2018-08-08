var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var RequirementsNotMetSchema = new Schema({

    className: {
        type: String
    },
    testName: {
        type: String
    },
    byTopic: [{
        name: String,
        major: [String],
        minor: [String],
        critical: [String]
    }],
    byTrainee: [{
        name: String,
        major: [String],
        minor: [String],
        critical: [String]
    }]
});

var RequirementsNotMet = mongoose.model('requirements_result', RequirementsNotMetSchema);

module.exports = RequirementsNotMet;