import {combineReducers} from 'redux';
import questionsOnAPageReducer from './questionsOnAPage';
import {WayPointSection} from '../actions';
const rootReducer = combineReducers({
    questionsOnAPage: questionsOnAPageReducer,
    WayPointSection
});

export default rootReducer;