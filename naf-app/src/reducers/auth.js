import { createReducer } from '../utils/Utils';
import {
  RECEIVE_USER_INFO,
} from '../constants/index';


const initialState = {
	userId : "",
    isAuthenticating: false,
    name:"",
    loginFailed: false
};


export default createReducer(initialState, {
	[RECEIVE_USER_INFO]: (state, payload) =>
		Object.assign({}, state, {
			userId: payload.res.id,
			name: payload.res.name,
			loginFailed: payload.res.loginFailed
		}),
});
