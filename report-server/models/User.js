import mongoose from  'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
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




const User = mongoose.model('User', UserSchema);
module.exports = User;