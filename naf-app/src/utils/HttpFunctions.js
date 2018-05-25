import axios from 'axios';


export function login(username, password) {
	return axios.post('http://localhost:8888/api/login', {
         username,
         password
	});
	
}