import axios from 'axios';

// http://localhost:8080
// http://ec2-54-193-65-106.us-west-1.compute.amazonaws.com:8080

const URL = 'http://localhost:8080';
// const URL ='http://ec2-54-193-65-106.us-west-1.compute.amazonaws.com:8080';

export function login(username, password) {
	return axios.post(`${URL}/api/login`, {
         username,
         password
	});
}

export function getQuestions(userId) {
	const testParamName="Test Three";
	return axios.post(`${URL}/api/questions`, {
		 userId,
		 testParamName
	});
}

export function saveAnswer(userId, taskId, sessionId, sectionId, questionId, answer) {
	return axios.post(`${URL}/api/questionAnswerStore`, {
			userId,
			taskId,
			sessionId,
			sectionId,
			questionId,
			answer
	});
}

export function saveResponse(userId, taskId, sessionId, sectionId, questionId, response) {
	return axios.post(`${URL}/api/questionResponseStore`, {
		userId,
		taskId,
		sessionId,
		sectionId,
		questionId,
		response
	});
}


export function saveHotspot(userId, taskId, sessionId, sectionId, questionId, response) {
	return axios.post(`${URL}/api/hotspotStore`, {
		userId,
		taskId,
		sessionId,
		sectionId,
		questionId,
		response
	});
}

export function submitAnswer(userId, sectionId, timeLeft) {
	console.log("submit Section");
	return axios.post(`${URL}/api/submitSection`, {
		userId,
		sectionId,
		timeLeft
	});
}

export function finishTest(userId, sessionId) {
	return axios.post(`${URL}/api/finishTest`, {
		userId,
		sessionId
	});
}
