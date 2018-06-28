import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TaskSchema = new Schema({

	sectionTimeUsed: [
		{ type: String}
	],
	test: {
		type: Schema.Types.ObjectId,
		ref: 'Test'
	},
	// user: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'User'
	// },
	score: {
		type: Number
	},
	// session: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'Session'
	// },
	answerId: {
		type: Schema.Types.ObjectId,
		ref: 'Answer'
	}

	


});

module.exports = mongoose.model('Task', TaskSchema);