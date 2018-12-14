/* eslint-disable no-unused-expressions */
import { parseJSON } from '../utils/utils';
import { getPal3Question} from '../utils/httpFunctions';
import {
  RECEIVE_PAL3_QUESTION
} from '../constants';

export function fetchPal3Question(questionId) {
  return function(dispatch) {
    return getPal3Question(questionId)
          .then(parseJSON)
          .then(response => {
            dispatch(receivePal3Question(response))
          })
          .catch(error => {
              console.log(error);
          });
  };
}

export function receivePal3Question(response) {
    return {
    type: RECEIVE_PAL3_QUESTION,
    payload: { 
      question: response.question
    }
  }
}




