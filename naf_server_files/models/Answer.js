import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({

	answers: 
		{
				type: String	
		}
	,
	item: {
		type: Schema.Types.ObjectId,
		ref:'Item'
	},
	task: {
		type: Schema.Types.ObjectId,
		ref: 'Task'
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	section: {
		type: Schema.Types.ObjectId,
		ref: 'Section'
	},
	session: {
		type: Schema.Types.ObjectId,
		ref: 'Session'
	},
	pass: {
		type: Boolean,
		default: false
	}

});

module.exports = mongoose.model('Answer', AnswerSchema);