import axios from 'axios';


export function login(username, password) {
	return axios.post('api/login', {
		username,
		password
	});

}