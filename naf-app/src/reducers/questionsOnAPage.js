import {OPTION_SELECTED, 
  GO_TO_PAGE, 
  GO_TO_SECTION, 
  QUESTION_ANSWERED, 
  SET_TO_DEFAULT, 
  RESET_TIMER_TIME,
  CHANGE_BOOKMARK,
  RECEIVE_USER_QUESTIONS,
  FETCH_QUESTIONS_REQUEST,
  RECEIVE_USER_INFO,
  SUBMIT_SECTION_ANSWER
} from '../constants';
import {ESSAY, MULTI_CHOICE, MULTIPLE_ANSWER, SHORT_ANSWER, SINGLE_ANSWER} from '../constants';
import image from '../images/nimitz3.jpg';
import { saveAnswer, saveResponse } from '../utils/httpFunctions';

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
  isSubmitingAnswer: false,
  isAuthenticated: false
};

export default function (state = initState, action) {
  switch (action.type) {
    case OPTION_SELECTED:
      return optionSelected(state, action);
    case RECEIVE_USER_INFO:
      return {
        userId: action.payload.res.id,
        isFetchingQuestions: true,
        isAuthenticated: true
      };

    case GO_TO_PAGE:
      return {
        userId: state.userId,
        page: action.payload,
        section: state.section,
        totalSections: state.totalSections,
        allQuestionsAnswered: state.allQuestionsAnswered,
        questionsArray: state.questionsArray,
        qArray: state.qArray,
        time: state.time
      };

    case GO_TO_SECTION:
      return {
        isSubmitingAnswer: false,
        userId: state.userId,
        page: 0,
        section: action.payload,
        totalSections: state.totalSections,
        time: sectionTimes[action.payload],
        qArray: state.qArray,
        allQuestionsAnswered: state.allQuestionsAnswered,
        questionsArray: state.qArray[action.payload]
      };

    case QUESTION_ANSWERED:
      return questionAnswered(state, action);

    case FETCH_QUESTIONS_REQUEST:
      return {
        isFetchingQuestions: true
      }
    case RECEIVE_USER_QUESTIONS:
      return {
        page: 0,
        section: 0,
        time: sectionTimes[0],
        userId: state.userId,
        allQuestionsAnswered: false,
        totalSections: action.payload.questions.length,
        questionsArray: action.payload.questions[0],
        qArray: action.payload.questions,
        isFetchingQuestions: false
      };

    case CHANGE_BOOKMARK:
      return changeBookmark(state, action);

    case SUBMIT_SECTION_ANSWER:
      return {
        userId: state.userId,
        page: state.page,
        section: state.section,
        totalSections: state.totalSections,
        allQuestionsAnswered: state.allQuestionsAnswered,
        questionsArray: state.questionsArray,
        qArray: state.qArray,
        time: state.time,
        isSubmitingAnswer: true
      };
    default:
      return state;
  }
};

function optionSelected(state, action) {
  let numAnsweredQuestions = 0;
  let newArray = state.questionsArray.slice();
  let nextQuestionsArray = newArray.map((question) => {
    if (question.id === action.payload.questionId) {
      let questionSelected = false;
      // eslint-disable-next-line
      question.optionList.map((option) => {
        if (option === action.payload.option) {
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
                  state.section, 
                  action.payload.questionId, 
                  nextQuestionsArray[action.payload.questionId - 1].optionList
  );

  return {
    page: state.page,
    section: state.section,
    allQuestionsAnswered: numAnsweredQuestions === nextQuestionsArray.length,
    questionsArray: nextQuestionsArray,
    userId: state.userId,
    totalSections: state.totalSections,
    qArray: state.qArray
  };
}
function optionSave(userId, sectionId, questionId, answer) {
    saveAnswer(userId, sectionId, questionId, answer)
      .catch(error => {
        console.log(error);
      });
}

function questionAnswered(state, action) {
  let numAnsweredQuestions = 0;
  let newArray = state.questionsArray.slice();
  let nextQuestionsArray = newArray.map((question) => {
    if (question.id === action.payload.questionId) {
      question.answer = action.payload.answer;
      question.answered = question.answer !== "";
      responseSave(state.userId, state.section, question.id, {answer: question.answer, answered: question.answered});
    }
    if (question.answered) {
      numAnsweredQuestions++;
    }
    return question;
  });
  return {
    page: state.page,
    section: state.section,
    allQuestionsAnswered: numAnsweredQuestions === nextQuestionsArray.length,
    questionsArray: nextQuestionsArray,
    totalSections: state.totalSections,
    qArray: state.qArray,
    userId: state.userId
  };
}

function responseSave(userId, sectionId, questionId, answer) {
  saveResponse(userId, sectionId, questionId, answer)
    .catch(error => {
      console.log(error);
    });
}

function changeBookmark(state, action) {
  let newArray = state.questionsArray.slice();
  let nextQuestionsArray = newArray.map((question) => {
    if (question.id === action.payload.questionId) {
      question.bookmarked = !question.bookmarked;
    }
    return question;
  });
  return {
    userId: state.userId,
    page: state.page,
    section: state.section,
    allQuestionsAnswered: state.allQuestionsAnswered,
    questionsArray: nextQuestionsArray,
    qArray: state.qArray
  };
}