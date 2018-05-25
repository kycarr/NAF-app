import { createReducer } from '../utils/utils';
import {
  LOGIN_USER_REQUEST,
  RECEIVE_USER_INFO
} from '../constants/index';


const initialState = {
	id: -1,
    isAuthenticating: false
};


export default createReducer(initialState, {
	[RECEIVE_USER_INFO]: (state, payload) => 
		Object.assign({}, state, {
			id: payload.id
		}),
});
