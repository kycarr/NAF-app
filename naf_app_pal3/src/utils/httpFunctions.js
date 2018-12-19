import axios from 'axios';
import {
  SCROLL_SPEED,
  MULTI_CHOICE,
  SINGLE_ANSWER,
  SHORT_ANSWER,
  ESSAY,
  MULTIPLE_ANSWER,
  HOTSPOT,
  TABLE_FILL,
  DRAG_DROP
} from '../constants';
// http://localhost:8080
// http://ec2-54-193-65-106.us-west-1.compute.amazonaws.com:8080

// const URL = 'http://localhost:8080';
const URL = 'http://ec2-54-193-65-106.us-west-1.compute.amazonaws.com:8080';

const QUESTION_ID_DEFAULT = 0
let qArray =
  [
    {
      id: 1,
      type: MULTI_CHOICE,
      choiceType: SINGLE_ANSWER,
      question: "What are the two types of electrical communications?",
      topicId: 1,
      bookmarked: false,
      optionList: [{option: "Commercial and Navy", selected: false},
        {option: "Radio and wire", selected: false},
        {option: "Active and passive", selected: false},
        {option: "Simplex and duplex", selected: false}],
      correctAnswer: ['Radio and wire']
    },
    {
      id: 2,
      type: MULTI_CHOICE,
      choiceType: SINGLE_ANSWER,
      question: "What unit of measurement is used to express quantities of inductance?",
      topicId: 1,
      bookmarked: false,
      optionList: [{option: "Picofarads", selected: false}, {option: "Jules", selected: false}, {
        option: "Ohms",
        selected: false
      }, {option: "Microhenrys", selected: false}],
      correctAnswer: ['Microhenrys']
    },
    {
      id: 3,
      type: MULTI_CHOICE,
      choiceType: SINGLE_ANSWER,
      question: "When using frequencies above 30 MegaHertz, you are normally limited to using what range?",
      topicId: 2,
      bookmarked: false,
      optionList: [{option: "HF", selected: false},
        {option: "UHF", selected: false},
        {option: "Line-of-sight", selected: false},
        {option: "SATCOM", selected: false}],
      correctAnswer: ['HF']
    },
    {
      id: 4,
      type: MULTI_CHOICE,
      choiceType: SINGLE_ANSWER,
      question: "What is the final stage of a transmitter?",
      topicId: 2,
      bookmarked: false,
      optionList: [{option: "RF filter", selected: false},
        {option: "Pulse generator", selected: false},
        {option: "Power reduction", selected: false},
        {option: "Power amplifier", selected: false}],
      correctAnswer: ['Power amplifier']
    }
    ];

export function getPal3Question(questionId) {
	// console.log(questionId);
	// return axios.post(`${URL}/pal3/getQuestion`, {
	// 		questionId: "5b57cdda5c70356c2e39d850"
	// });
	// console.log({question: qArray[0]);
	return new Promise((resolve, reject) => {
		const q = {question: [qArray[questionId]]};
		resolve({
			data: q
		})
	})
}

