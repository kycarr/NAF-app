import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ClassSchema = new Schema({

    user:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'Instructor'
    },
    module: {
        type: Schema.Types.ObjectId,
        ref: 'Module'
    },
    task: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],

    className: String
});


module.exports = mongoose.model('Class', ClassSchema);