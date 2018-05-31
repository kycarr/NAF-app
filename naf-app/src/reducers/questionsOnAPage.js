import {OPTION_SELECTED, 
  GO_TO_PAGE, 
  GO_TO_SECTION, 
  QUESTION_ANSWERED, 
  SET_TO_DEFAULT, 
  RESET_TIMER_TIME,
  CHANGE_BOOKMARK,
  RECEIVE_USER_QUESTIONS,
  FETCH_QUESTIONS_REQUEST
} from '../constants';
import {ESSAY, MULTI_CHOICE, MULTIPLE_ANSWER, SHORT_ANSWER, SINGLE_ANSWER} from '../constants';
import image from '../images/nimitz3.jpg';

// import imageFlowChart from '../images/FlowChartExample.png';

let sectionTimes = [15 * 60, 17 * 60];

const initState = {
  page: 0,
  section: 0,
  time: 0,
  allQuestionsAnswered: false,
  totalSections: 0,
  questionsArray: {},
  isFetchingQuestions: true
};

export default function (state = initState, action) {
  switch (action.type) {
    case OPTION_SELECTED:
      return optionSelected(state, action);

    case GO_TO_PAGE:
      return {
        page: action.payload,
        section: state.section,
        allQuestionsAnswered: state.allQuestionsAnswered,
        totalSections: state.qArray.length,
        questionsArray: state.questionsArray
      };

    case GO_TO_SECTION:
      return {
        page: 0,
        section: action.payload,
        time: sectionTimes[action.payload],
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
        allQuestionsAnswered: false,
        totalSections: action.payload.questions.length,
        questionsArray: action.payload.questions[0],
        qArray: action.payload.questions,
        isFetchingQuestions: false
      };

    case CHANGE_BOOKMARK:
      return changeBookmark(state, action);

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
  return {
    page: state.page,
    section: state.section,
    allQuestionsAnswered: numAnsweredQuestions === nextQuestionsArray.length,
    totalSections: state.qArray.length,
    questionsArray: nextQuestionsArray
  };
}

function questionAnswered(state, action) {
  let numAnsweredQuestions = 0;
  let newArray = state.questionsArray.slice();
  let nextQuestionsArray = newArray.map((question) => {
    if (question.id === action.payload.questionId) {
      question.answer = action.payload.answer;
      question.answered = question.answer !== "";
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
    totalSections: state.qArray.length,
    questionsArray: nextQuestionsArray
  };
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
    page: state.page,
    section: state.section,
    allQuestionsAnswered: state.allQuestionsAnswered,
    totalSections: state.qArray.length,
    questionsArray: nextQuestionsArray
  };
}