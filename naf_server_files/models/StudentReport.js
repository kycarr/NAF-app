import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const StudentReportSchema = {

	session: {
		type: Schema.Types.ObjectId,
		ref:'Session'
	},
	testDate: {
		type: Date
	},
	user: {
		type: String
	},
	testName: {
		type: String
	},
	testScore: {
		type: String
	},
	testScorePercentage: {
		type: String
	},
	testResult: {
		type: String
	},
	requirementsNotMetObject: {
		Major: [{type: String}],
		Minor: [{type: String}],
		Critical: [{type: String}]
	},
	topicValue: [{type: Number}],
	topicLabel: [{type: String}],
	byTopic: [{
		topic: String,
		correct: Number,
		incorrect: Number,
		percentage: Number
	}]


}

module.exports = mongoose.model('StudentReport', StudentReportSchema);