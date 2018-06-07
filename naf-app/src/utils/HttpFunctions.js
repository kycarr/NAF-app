import axios from 'axios';


export function login(username, password) {
	return axios.post('http://localhost:8888/api/login', {
         username,
         password
	});
}

export function getQuestions(userId) {
	return axios.post('http://localhost:8888/api/questions', {
		 userId
	});
}

export function saveAnswer(userId, sectionId, questionId, answer) {
	return axios.get('http://localhost:8888/api/questionAnswerStore', {
		params: {
			userId: userId,
			sectionId: sectionId,
			questionId: questionId,
			answer: answer
		}
	});
}

export function saveResponse(userId, sectionId, questionId, response) {
	  console.log("userID: " + userId);
  	  console.log("question ID: " + questionId);
  	  console.log("sectionId: " + sectionId);
	return axios.post('http://localhost:8888/api/questionResponseStore', {
		userId,
		sectionId,
		questionId,
		response
	});
}

export function submitAnswer(userId, sectionId, timeLeft) {
	return axios.post('http://localhost:8888/api/submitSection', {
		userId,
		sectionId,
		timeLeft
	});
}

export function finishTest(userId) {
	return axios.post('http://localhost:8888/api/finishTest', {
		userId
	});
}