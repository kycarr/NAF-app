import mongoose from  'mongoose';
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    startTime: {
        type: String
    },
    stopTime: {
        type: Number
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    user: {                     
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }

});

//may need to add virtual props for appropriate time conversion

const Session = mongoose.model('Session', SessionSchema);
module.exports = Session;