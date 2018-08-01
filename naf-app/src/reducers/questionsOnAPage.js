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
import {ESSAY, MULTI_CHOICE, MULTIPLE_ANSWER, SHORT_ANSWER, SINGLE_ANSWER} from '../constants';
import image from '../images/nimitz3.jpg';
import { saveAnswer, saveResponse } from '../utils/httpFunctions';
import { createReducer } from '../utils/utils';

// import imageFlowChart from '../images/FlowChartExample.png';

let sectionTimes = [15 * 60, 17 * 60];

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
  resultUrl: ""
};



export default createReducer(initState, {

  [RECEIVE_USER_INFO]: (state, payload) =>
    Object.assign({}, state, {
      userId: payload.res.id,
      isFetchingQuestions: true,
      isAuthenticated: !payload.res.loginFailed
    }),

  [OPTION_SELECTED]: (state, payload) =>
    optionSelected(state, payload),

  [GO_TO_PAGE]: (state, payload) =>
      Object.assign({}, state, {
        page: payload,
    }),

  [GO_TO_SECTION]: (state, payload) =>
    Object.assign({}, state, {
      isSubmitingAnswer: false,
      page: 0,
      section: payload,
      time: sectionTimes[payload],
      questionsArray: state.qArray[payload]
  }),

  [QUESTION_ANSWERED]: (state, payload) =>
    questionAnswered(state, payload),

  [FETCH_QUESTIONS_REQUEST]: (state, payload) =>
    Object.assign({}, state, {
      isFetchingQuestions: true
    }),

  [RECEIVE_USER_QUESTIONS]: (state, payload) =>
    Object.assign({}, state, {
      page: 0,
      section: 0,
      time: sectionTimes[0],
      allQuestionsAnswered: false,
      totalSections: payload.questions.length,
      questionsArray: payload.questions[0],
      qArray: payload.questions,
      sessionId: payload.sessionId,
      taskId: payload.taskId,
      isFetchingQuestions: false
    }),
  [CHANGE_BOOKMARK]: (state, payload) =>
    changeBookmark(state, payload),

  [SUBMIT_SECTION_ANSWER]: (state, payload) =>
    Object.assign({}, state, {
      isSubmitingAnswer: true
    }),

  [SET_TO_DEFAULT]: (state, payload) =>
    Object.assign({}, state, initState),

  [GO_TO_REVIEW_TEST_PAGE]: (state, payload) =>
    Object.assign({}, state, {
      resultUrl: payload.url,
      isAuthenticated: false
    })
});

function optionSelected(state, payload) {
  let numAnsweredQuestions = 0;
  let newArray = state.questionsArray.slice();
  let nextQuestionsArray = newArray.map((question) => {
    if (question.id === payload.questionId) {
      let questionSelected = false;
      // eslint-disable-next-line
      question.optionList.map((option) => {
        if (option === payload.option) {
          option.selected = !option.selected;
        }
        else if (question.choiceType === SINGLE_ANSWER) {
          option.selected = false;
        }
        questionSelected = questionSelected || option.selected
      });
      question.answered = questionSelected;
    }
    if (question.answered) {
      numAnsweredQuestions++;
    }
    return question;
  });
  optionSave(state.userId,
                  state.taskId,
                  state.sessionId,
                  state.section,
                  payload.questionId,
                  nextQuestionsArray[payload.questionId - 1].optionList
  );

  return Object.assign({}, state, {
      allQuestionsAnswered: numAnsweredQuestions === nextQuestionsArray.length,
      questionsArray: nextQuestionsArray,
  });
}
function optionSave(userId, taskId, sessionId, sectionId, questionId, answer) {
    saveAnswer(userId, taskId, sessionId, sectionId, questionId, answer)
      .catch(error => {
        console.log(error);
      });
}

function questionAnswered(state, payload) {
  let numAnsweredQuestions = 0;
  let newArray = state.questionsArray.slice();
  let nextQuestionsArray = newArray.map((question) => {
    if (question.id === payload.questionId) {
      question.answer = payload.answer;
      question.answered = question.answer !== "";
      responseSave(state.userId, state.taskId, state.sessionId, state.section, question.id, {answer: question.answer, answered: question.answered});
    }
    if (question.answered) {
      numAnsweredQuestions++;
    }
    return question;
  });
  return Object.assign({}, state, {
    allQuestionsAnswered: numAnsweredQuestions === nextQuestionsArray.length,
    questionsArray: nextQuestionsArray,
  });
}

function responseSave(userId, taskId, sessionId, sectionId, questionId, answer) {
  saveResponse(userId, taskId, sessionId, sectionId, questionId, answer)
    .catch(error => {
      console.log(error);
    });
}

function changeBookmark(state, payload) {
  let newArray = state.questionsArray.slice();
  let nextQuestionsArray = newArray.map((question) => {
    if (question.id === payload.questionId) {
      question.bookmarked = !question.bookmarked;
    }
    return question;
  });
  return Object.assign({}, state, {
    questionsArray: nextQuestionsArray,
  });
}
