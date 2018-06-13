import axios from 'axios';


export function login(username, password) {
	return axios.post('http://localhost:8080/api/login', {
         username,
         password
	});
}

export function getQuestions(userId) {
	return axios.post('http://localhost:8080/api/questions', {
		 userId
	});
}

export function saveAnswer(userId, sectionId, questionId, answer) {
	return axios.post('http://localhost:8080/api/questionAnswerStore', {
			userId,
			sectionId,
			questionId,
			answer
	});
}

export function saveResponse(userId, sectionId, questionId, response) {
	  console.log("userID: " + userId);
  	  console.log("question ID: " + questionId);
  	  console.log("sectionId: " + sectionId);
	return axios.post('http://localhost:8080/api/questionResponseStore', {
		userId,
		sectionId,
		questionId,
		response
	});
}

export function submitAnswer(userId, sectionId, timeLeft) {
	return axios.post('http://localhost:8080/api/submitSection', {
		userId,
		sectionId,
		timeLeft
	});
}

export function finishTest(userId) {
	return axios.post('http://localhost:8080/api/finishTest', {
		userId
	});
}