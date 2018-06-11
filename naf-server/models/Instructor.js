import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const InstructorSchema = new Schema({

	name: {
		type: String
	},
	assignment: {
		type: Schema.Types.ObjectId,
		ref: 'Assignment'
	},
	classes: [{
		type: Schema.Types.ObjectId,
		ref: 'Class'
	}]

});

module.exports = mongoose.model('Instructor', InstructorSchema);