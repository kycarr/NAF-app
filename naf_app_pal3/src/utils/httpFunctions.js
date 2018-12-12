import axios from 'axios';

// http://localhost:8080
// http://ec2-54-193-65-106.us-west-1.compute.amazonaws.com:8080

const URL = 'http://localhost:8080';
// const URL ='http://ec2-54-193-65-106.us-west-1.compute.amazonaws.com:8080';


export function getQuestions(userId) {
	const testParamName="Test Five";
	return axios.post(`${URL}/api/questions`, {
		 userId,
		 testParamName
	});
}

