import mongoose from  'mongoose';
const Schema = mongoose.Schema;

const ItemSchema = new Schema({

    ItemType: {
        type: String,
        required: true
    },
    choiceType: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    optionList: [
        {
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
    answer: {
        type: String
    },
    correctAnswer: {
        type: String
    },
    score: {
        type: Number,
        required: true
    }

});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;