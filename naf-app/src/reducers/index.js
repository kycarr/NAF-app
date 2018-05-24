import {combineReducers} from 'redux';
import QuestionsOnAPageReducer from './QuestionsOnAPage';
import {WayPointSection} from '../actions';
const rootReducer = combineReducers({
    QuestionsOnAPage: QuestionsOnAPageReducer,
    WayPointSection
});

export default rootReducer;