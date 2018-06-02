import { parseJSON } from '../utils/utils';
import { login, getQuestions, submitAnswer, finishTest } from '../utils/httpFunctions';
import {
  OPTION_SELECTED,
  GO_TO_PAGE,
  GO_TO_SECTION,
  QUESTION_ANSWERED,
  SET_TO_DEFAULT,
  CHANGE_BOOKMARK,
  LINE_NUMBER,
  LOGIN_USER_REQUEST,
  RECEIVE_USER_INFO,
  FETCH_QUESTIONS_REQUEST,
  RECEIVE_USER_QUESTIONS,
  RECEIVE_SAVE_ANSWER,
  SUBMIT_SECTION_ANSWER,
} from '../constants';

export function optionSelected(userId, sectionId, questionId, option) {
  // answerQuestion(userId, sectionId, questionId, option);
  // console.log(option);
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
    payload: {questionId: questionId}
  }
}

export function resetToDefaultState() {
  return {
    type: SET_TO_DEFAULT
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
        dispatch(() => {
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
    payload: { res: response }
  }
}

export function fetchQuestions(userId) {
  return function(dispatch) {
    dispatch(() => {
      type: FETCH_QUESTIONS_REQUEST
    });
    return getQuestions(userId)
      .then(parseJSON)
      .then(response => {
        dispatch(receiveQuestions(response));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_USER_QUESTIONS,
    payload: { questions: questions } 
  }
}

export function submitSectionAnswers(userId, sectionId, timeLeft) {
  return function(dispatch) {
    dispatch(() => {
        type: SUBMIT_SECTION_ANSWER
    });
    return submitAnswer(userId, sectionId, timeLeft)
      .then(parseJSON)
      .then(() => {
        dispatch(goToSection(sectionId + 1));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function receiveSaveAnswer(response) {
  return {
    type: RECEIVE_SAVE_ANSWER,
    payload: { 
      success: response.success,
      questionId: response.questionId
     } 
  }
}

  
  export function sendTestFinishAction(userId, sectionId, timeLeft){
    sendTestFinish(userId, sectionId, timeLeft);
    return {
      type: SET_TO_DEFAULT
    }
  }

async function sendTestFinish(userId, sectionId, timeLeft) {
  let response;
  try {
      response = await parseJSON(submitAnswer(userId, sectionId, timeLeft));
      console.log(response);
  } catch(err) {
      console.log(err);
    }
  try {
    response = await parseJSON(finishTest(userId, sectionId, timeLeft));
  } catch(err) {
      console.log(err);
    }
  return response;
}