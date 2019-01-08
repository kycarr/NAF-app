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
      id: 0,
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
      id: 1,
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
      id: 2,
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
      id: 3,
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
    },
    {
      id: 4,
      type: TABLE_FILL,
      question: "For each switch symbol in the table, please enter a number for the number of poles, throws, and breaks.",
      topicId: 1,
      bookmarked: false,
      columns: [
        {Header: "Symbol",accessor: "symbol"},
        {Header: "Poles",accessor: "poles"},
        {Header: "Throws",accessor: "throws"},
        {Header: "Breaks",accessor: "breaks"}
      ],
      data: [
        {
          symbol: "1",
          poles: "",
          throws: "",
          breaks: ""
        },
        {
          symbol: "2",
          poles: "",
          throws: "",
          breaks: ""
        },
        {
          symbol: "3",
          poles: "",
          throws: "",
          breaks: ""
        },
        {
          symbol: "4",
          poles: "",
          throws: "",
          breaks: ""
        }
      ],
      correctAnswer: ['0:poles:1','0:throws:2','0:breaks:3','1:poles:4','1:throws:5','1:breaks:6','2:poles:7','2:throws:8','2:breaks:9','3:poles:10','3:throws:11','3:breaks:12']
    },
    {
      id: 5,
      type: HOTSPOT,
      question: "On the schematic diagram for the radar power supply (unit 4), there are four fuses. Click on the region for fuses 3 and 4.",
      topicId: 4,
      bookmarked: false,
      limit: 2,
      correctAnswer: ["314:206:354:246", "460:108:500:148"]
    },
    {
      id: 6,
      type: DRAG_DROP,
      question: "Construct a simple bridge rectifier by dragging the appropriate components from the tray on the left (below) onto the breadboard (on the right below)",
      topicId: 3,
      bookmarked: false,
      correctAnswer: ["a:109:203", "c:107:291", "d:232:199", "e:231:304", "b:76:469"]

    },
    {
      id: 7,
      type: ESSAY,
      topicId: 4,
      bookmarked: false,
      answer: "",
      question: "Why do you want to join the Navy?",
      correctAnswer: ["ESSAY"]
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
