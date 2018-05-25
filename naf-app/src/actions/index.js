import { parseJSON } from '../utils/utils';
import { login } from '../utils/httpFunctions';
import {
  OPTION_SELECTED,
  GO_TO_PAGE,
  GO_TO_SECTION,
  QUESTION_ANSWERED,
  SET_TO_DEFAULT,
  CHANGE_BOOKMARK,
  LINE_NUMBER,
  LOGIN_USER_REQUEST,
  RECEIVE_USER_INFO
} from '../constants';

export function optionSelected(questionId, option) {
  return {
    type: OPTION_SELECTED,
    payload: {questionId: questionId, option: option}
  };
}

export function goToPage(pageNumber) {
  return {
    type: GO_TO_PAGE,
    payload: pageNumber
  }
}

export function goToSection(sectionNumber) {
  return {
    type: GO_TO_SECTION,
    payload: sectionNumber
  }
}

export function questionAnswered(questionId, answer) {
  return {
    type: QUESTION_ANSWERED,
    payload: {questionId: questionId, answer: answer}
  };
}

export function changeBookmark(questionId) {
  return {
    type: CHANGE_BOOKMARK,
    payload: {questionId: questionId},
  }
}

export function resetToDefaultState() {
  return {
    type: SET_TO_DEFAULT,
  }
}

export function WayPointSection(lineNumber) {

  console.log("lineNumber: " + lineNumber);
  return {
    type: LINE_NUMBER,
    payload: lineNumber
  }
}

export function loginUser(username, password) {
  console.log('login');
    return function (dispatch) {
        dispatch((username, password) => {
            type: LOGIN_USER_REQUEST
        });
        return login(username, password)
          .then(parseJSON)
          .then(response => {
            dispatch(receiveUserInfo(response));
          })
          .catch(error => {
            console.log(error);
          });
    };
}

export function receiveUserInfo(response) {
  console.log("receiveUserInfo: " + response);
  return {
    type: RECEIVE_USER_INFO,
    payload: { id: response }
  }
}

