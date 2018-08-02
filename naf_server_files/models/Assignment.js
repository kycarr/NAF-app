import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
    
    dateCompleted: {
        type: Date,
        default: Date.now
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'Instructor'
    },
    // numberFinished: {
    //     type: Number
    // },
    // numberIncomplete: {
    //     type: Number
    // },
    // numberNotStarted: {
    //     type: Number
    // },
    // averagePercentage: {
    //     type: Number
    // },
    // passPercent: {
    //     type: Number
    // },
    sessions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Session'
        }
    ],
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }
});

module.exports = mongoose.model('Assignment', AssignmentSchema);