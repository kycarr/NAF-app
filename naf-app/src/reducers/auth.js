import { createReducer } from '../utils/utils';
import {
  RECEIVE_USER_INFO
} from '../constants/index';


const initialState = {
	userId : "",
    isAuthenticating: false,
    firstname: "",
    lastname: ""
};


export default createReducer(initialState, {
	[RECEIVE_USER_INFO]: (state, payload) => 
		Object.assign({}, state, {
			userId: payload.res.id,
			firstname: payload.res.firstname,
			lastname: payload.res.lastname
		}),
});
