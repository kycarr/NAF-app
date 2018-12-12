import {combineReducers} from 'redux';
import questionsOnAPageReducer from './questionsOnAPage';
import auth from './auth'
import {WayPointSection} from '../actions';
const rootReducer = combineReducers({
    QuestionsOnAPage: questionsOnAPageReducer,
    auth
});

export default rootReducer;