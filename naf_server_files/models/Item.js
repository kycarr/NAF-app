import mongoose from  'mongoose';
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    
    id: {
        type: Number
    },
    sectionId: {
        type: Number
    },
    section: {
        type: Schema.Types.ObjectId,
        ref: 'Section'
    },
    type: {
        type: String,
    },
    choiceType: {
        type: String,
    },
    // topic: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Topic'
    // },
    topicId: {
        type: Number
    },
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
    },
    test: {
        type: Schema.Types.ObjectId,
        ref: 'Test'
    },
    limit: {
        type: Number
    }

});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;