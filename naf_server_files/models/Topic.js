import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TopicSchema = new Schema({

	id: {
		type: Number
	},
	name: {
		type: String
	}

});

module.exports = mongoose.model('Topic', TopicSchema);