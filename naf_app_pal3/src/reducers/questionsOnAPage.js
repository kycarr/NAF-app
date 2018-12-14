import {
  RECEIVE_PAL3_QUESTION
} from '../constants';
import {SINGLE_ANSWER} from '../constants';
import image from '../images/nimitz3.jpg';
import { createReducer } from '../utils/utils';

// import imageFlowChart from '../images/FlowChartExample.png';


const initState = {
    question: {},
    isFetchingQuestions: true
};



export default createReducer(initState, {
  [RECEIVE_PAL3_QUESTION]: (state, payload) =>
    Object.assign({}, state, {
      question: payload.question,
      isFetchingQuestions: false
    })
});


// function optionSave(userId, taskId, sessionId, sectionId, questionId, answer) {
//   saveAnswer(userId, taskId, sessionId, sectionId, questionId, answer)
//     .catch(error => {
//       console.log(error);
//     });
// }
