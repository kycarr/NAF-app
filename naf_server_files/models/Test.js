import mongoose from  'mongoose';
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  
    testName: {
        type: String
    },
    module: {
        type: String
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    time: {
        type: String
    },
    assignments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Assignment'
        }
    ],
    sections: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Section'   
        }
    ]

});

//may need virtual props to convert time from number to required format

const Test = mongoose.model('Test', TestSchema);
module.exports = Test;