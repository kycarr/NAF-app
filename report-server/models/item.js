import mongoose from  'mongoose';
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    
    id: {
        type: Number
    },
    sectionId: {
        type: Number
    },
    type: {
        type: String,
    },
    choiceType: {
        type: String,
    },
    answered: Boolean,
    question: {
        type: String,
    },
    optionList: [{
        option: String,
        selected: Boolean
    }
    ],
    videoURL: {
        type: String
    },
    imageURL: {
        type: String
    },
    correctAnswer: {
        type: String
    },
    score: {
        type: Number
    },
    bookmarked: {
        type: Boolean
    }

});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;