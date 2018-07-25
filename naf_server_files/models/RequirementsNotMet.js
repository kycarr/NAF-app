var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var RequirementsNotMetSchema = new Schema({

    byTopic: [{
        topic: String,
        major: [String],
        minor: [String],
        critical: [String]
        test:
    }],

    byTrainee: [{
        user: {                     
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        major: [String],
        minor: [String],
        critical: [String]
        test
    }]
});


var RequirementsNotMet = mongoose.model('test_results', RequirementsNotMetSchema);

module.exports = RequirementsNotMet;