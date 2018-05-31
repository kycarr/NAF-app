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