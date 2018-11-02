/* eslint-disable no-unused-expressions */
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
  GO_TO_REVIEW_TEST_PAGE,
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

export function goToReviewTestPage(response) {
  console.log(response);
  return {
    type: GO_TO_REVIEW_TEST_PAGE,
    payload: {
      url: response.url,
      pass: response.pass,
      score: response.score
    }
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
  return {
    type: LINE_NUMBER,
    payload: lineNumber
  }
}

export function loginUser(username, password) {
  console.log('login');
    return function (dispatch) {
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

export function receiveQuestions(response) {
  console.log(response.questionsResponse);
  return {
    type: RECEIVE_USER_QUESTIONS,
    payload: { questions: response.questionsResponse,
              sessionId: response.sessionId,
              taskId: response.taskId
    } 
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


export function saveHotspotAnswer(userId, sectionId) {



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

export function sendTestFinishAction(userId, sessionId, sectionId, timeLeft){
  return function(dispatch) {
    return submitAnswer(userId, sectionId, timeLeft)
      .then(parseJSON)
      .then((response) => {
        console.log(response);
      })
      .catch(error =>  {
      console.log(error);
      })
      .then(() => {
        return finishTest(userId, sessionId)
      })
      .then(parseJSON)
      .then((response) => {
        dispatch(goToReviewTestPage(response));
        })
        .catch(error =>  {
          console.log(error);
      });
    };

}
