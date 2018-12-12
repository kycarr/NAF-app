/* eslint-disable no-unused-expressions */
import { parseJSON } from '../utils/utils';
import { getQuestions} from '../utils/httpFunctions';
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





