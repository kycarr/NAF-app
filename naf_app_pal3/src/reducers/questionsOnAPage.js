import {OPTION_SELECTED,
  GO_TO_PAGE,
  GO_TO_SECTION,
  QUESTION_ANSWERED,
  SET_TO_DEFAULT,
  CHANGE_BOOKMARK,
  RECEIVE_USER_QUESTIONS,
  FETCH_QUESTIONS_REQUEST,
  RECEIVE_USER_INFO,
  SUBMIT_SECTION_ANSWER,
  GO_TO_REVIEW_TEST_PAGE
} from '../constants';
import {SINGLE_ANSWER} from '../constants';
import image from '../images/nimitz3.jpg';
import { saveAnswer, saveResponse } from '../utils/httpFunctions';
import { createReducer } from '../utils/utils';

// import imageFlowChart from '../images/FlowChartExample.png';


const initState = {
  page: 0,
  section: 0,
  time: 0,
  allQuestionsAnswered: false,
  totalSections: 0,
  questionsArray: {},
  isFetchingQuestions: true,
  qArray: {},
  userId: "",
  sessionId: "",
  taskId: "",
  isSubmitingAnswer: false,
  isAuthenticated: false,
  answerArray: [],
  resultUrl: "",
  numAnsweredQuestions: 0,

};



export default createReducer(initState, {

  [RECEIVE_USER_INFO]: (state, payload) =>
    Object.assign({}, state, {
      userId: payload.res.id,
      isFetchingQuestions: true,
      isAuthenticated: !payload.res.loginFailed
    })
});


// function optionSave(userId, taskId, sessionId, sectionId, questionId, answer) {
//   saveAnswer(userId, taskId, sessionId, sectionId, questionId, answer)
//     .catch(error => {
//       console.log(error);
//     });
// }
