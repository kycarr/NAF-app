import axios from 'axios';

// http://localhost:8080
// http://ec2-54-193-65-106.us-west-1.compute.amazonaws.com:8080

// const URL = 'http://localhost:8080';
const URL = 'http://ec2-54-193-65-106.us-west-1.compute.amazonaws.com:8080';

const QUESTION_ID_DEFAULT = "5b57cdda5c70356c2e39d850"
const QUESTIONS = {
	"5b57cdda5c70356c2e39d850": { "question": [{ "data": [], "columns": [], "_id": "5b57cdda5c70356c2e39d850", "id": 1, "type": "Multiple_choice", "choiceType": "Single_Answer", "question": "What are the two types of electrical communications?", "topicId": 1, "bookmarked": false, "optionList": [{ "_id": "5b57cdda5c70356c2e39d854", "option": "Commercial and Navy", "selected": false }, { "_id": "5b57cdda5c70356c2e39d853", "option": "Radio and wire", "selected": false }, { "_id": "5b57cdda5c70356c2e39d852", "option": "Active and passive", "selected": false }, { "_id": "5b57cdda5c70356c2e39d851", "option": "Simplex and duplex", "selected": false }], "correctAnswer": "Radio and wire", "sectionId": 0, "test": "5b57cdda5c70356c2e39d843", "__v": 0, "section": "5b57cdda5c70356c2e39d84e" }] }
}

export function getPal3Question(questionId) {
	// return axios.post(`${URL}/pal3/getQuestion`, {
	// 		questionId
	// });
	return new Promise((resolve, reject) => {
		const q = QUESTIONS[questionId] || QUESTIONS[QUESTION_ID_DEFAULT]
		resolve({
			data: q
		})
	})
}

