import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SectionSchema = new Schema({
    
    sectionId: {
        type: Number,
        required: true
    },
    time:{
        type: String
    },
    test: {
        type: Schema.Types.ObjectId,
        ref: 'Test'
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }    
    ],
    userId: String
});

//virtual prop for converting time


module.exports = mongoose.model('Section', SectionSchema);