import {OPTION_SELECTED, 
  GO_TO_PAGE, 
  GO_TO_SECTION, 
  QUESTION_ANSWERED, 
  SET_TO_DEFAULT, 
  RESET_TIMER_TIME,
  CHANGE_BOOKMARK
} from '../constants';
import {ESSAY, MULTI_CHOICE, MULTIPLE_ANSWER, SHORT_ANSWER, SINGLE_ANSWER} from '../constants';
import image from '../images/nimitz3.jpg';

// import imageFlowChart from '../images/FlowChartExample.png';

let sectionTimes = [15 * 60, 17 * 60];
let qArray = [
  [
    {
      id: 1,
      type: MULTI_CHOICE,
      choiceType: SINGLE_ANSWER,
      question: "What are the two types of electrical communications?",
      answered: false,
      bookmarked: false,
      optionList: [{option: "Commercial and Navy", selected: false},
        {option: "Radio and wire", selected: false},
        {option: "Active and passive", selected: false},
        {option: "Simplex and duplex", selected: false}]
    },
    {
      id: 2,
      type: MULTI_CHOICE,
      choiceType: SINGLE_ANSWER,
      question: "What unit of measurement is used to express quantities of inductance?",
      answered: false,
      bookmarked: false,
      optionList: [{option: "Picofarads", selected: false}, {option: "Jules", selected: false}, {
        option: "Ohms",
        selected: false
      }, {option: "Microhenrys", selected: false}]
    },
    {
      id: 3,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "When using frequencies above 30 MegaHertz, you are normally limited to using what range?",
      answered: false,
      bookmarked: false,
      optionList: [{option: "HF", selected: false},
        {option: "UHF", selected: false},
        {option: "Line-of-sight", selected: false},
        {option: "SATCOM", selected: false}]
    },
    {
      id: 4,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "What is the final stage of a transmitter?",
      answered: false,
      bookmarked: false,
      optionList: [{option: "RF filter", selected: false},
        {option: "Pulse generator", selected: false},
        {option: "Power reduction", selected: false},
        {option: "Power amplifier", selected: false}]
    },
    {
      id: 5,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "Which Receiver assembly provides the internal 5MHz reference signal?",
      answered: false,
      bookmarked: false,
      optionList: [{option: "A12", selected: false},
        {option: "A11", selected: false},
        {option: "A21", selected: false},
        {option: "A10", selected: false}]
    },
    {
      id: 6,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "The ________ in an AM transmitter converts audio (sound) into electrical energy.",
      answered: false,
      bookmarked: false,
      optionList: [{option: "Microphone", selected: false},
        {option: "Speaker", selected: false},
        {option: "Pulse-generator", selected: false},
        {option: "Toner", selected: false}]
    },
    {
      id: 7,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "What is another name for the positive electrode?",
      answered: false,
      bookmarked: false,
      optionList: [{option: "Anode", selected: false},
        {option: "Cathode", selected: false},
        {option: "Diode", selected: false},
        {option: "Triode", selected: false}]
    },
    {
      id: 8,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "One cycle is equal to how many degrees of rotation of a conductor in a magnetic field?",
      answered: false,
      bookmarked: false,
      optionList: [{option: "90°", selected: false},
        {option: "180°", selected: false},
        {option: "270°", selected: false},
        {option: "360°", selected: false}]
    },
    {
      id: 9,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "In the example 1A6CR3, what is the assembly designator?",
      answered: false,
      bookmarked: false,
      optionList: [{option: "1A", selected: false},
        {option: "A6", selected: false},
        {option: "6CR", selected: false},
        {option: "CR3", selected: false}]
    },
    {
      id: 10,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "What is the frequency range of EHF communications?",
      answered: false,
      bookmarked: false,
      optionList: [{option: "30-300 GHz", selected: false},
        {option: "3-30 GHz", selected: false},
        {option: "300 MHZ - 3GHz", selected: false},
        {option: "30-300 MHz", selected: false}]
    },
    {
      id: 11,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "A message transmitted on several frequencies at the same time is what type of transmission?",
      answered: false,
      bookmarked: false,
      optionList: [{option: "Time-diversity", selected: false},
        {option: "Frequency-diversity", selected: false},
        {option: "Space-diversity", selected: false},
        {option: "Modulation-diversity", selected: false}]
    },
    {
      id: 12,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "The ________ extracts the modulating audio signal.",
      answered: false,
      bookmarked: false,
      optionList: [{option: "Detector", selected: false},
        {option: "Extractor", selected: false},
        {option: "Toner", selected: false},
        {option: "Modulator", selected: false}]
    },
    {
      id: 13,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "Which of the following is NOT one of the four basic receiver characteristics?",
      answered: false,
      bookmarked: false,
      optionList: [{option: "Sensitivity", selected: false},
        {option: "Amplification", selected: false},
        {option: "Noise", selected: false},
        {option: "Fidelity", selected: false}]
    },
    {
      id: 14,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "What does manual gain control do to strong and weak signals?",
      answered: false,
      bookmarked: false,
      optionList: [{option: "Amplifies the strong and attenuates the weak", selected: false},
        {option: "Selects the strong and rejects the weak", selected: false},
        {option: "Attenuates the strong and amplifies the weak", selected: false},
        {option: "Rejects the strong and selects the weak", selected: false}]
    },
    {
      id: 15,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "What are the terms used to describe an open or closed telegraph circuit?",
      answered: false,
      bookmarked: false,
      optionList: [{option: "Dot and dash", selected: false},
        {option: "Start and stop", selected: false},
        {option: "Hack and slash", selected: false},
        {option: "Space and mark", selected: false}]
    }],

  [
    {
      id: 1,
      type: MULTI_CHOICE,
      choiceType: SINGLE_ANSWER,
      videoURL: "http://www.navy.mil/media/flashvideo/wwr/wwr_03122018.mp4",
      question: "When is women's history month?",
      answered: false,
      bookmarked: false,
      optionList: [{option: "January", selected: false},
        {option: "February", selected: false},
        {option: "March", selected: false},
        {option: "April", selected: false}]
    },
    {
      id: 2,
      type: MULTI_CHOICE,
      choiceType: SINGLE_ANSWER,
      imageURL: image,
      question: "What is this aircraft carrier?",
      answered: false,
      bookmarked: false,
      optionList: [{option: "Nimitz-class", selected: false},
        {option: "Gerald R. Ford-class", selected: false},
        {option: "Lexington-class", selected: false},
        {option: "Kitty Hawk-class", selected: false}]
    },
    {
      id: 3,
      type: SHORT_ANSWER,
      answered: false,
      bookmarked: false,
      answer: "",
      question: "When using frequencies above 30 megahertz, you are normally limited to using what range?",
    },
    {
      id: 4,
      type: MULTI_CHOICE,
      choiceType: SINGLE_ANSWER,
      question: "RF filter is the final stage of a transmitter.",
      answered: false,
      bookmarked: false,
      optionList: [{option: "True", selected: false},
        {option: "False", selected: false}]
    },
    {
      id: 5,
      type: ESSAY,
      answered: false,
      bookmarked: false,
      answer: "",
      question: "Why do you want to join the Navy?"
    },
    {
        id: 6,
        type: MULTI_CHOICE,
        choiceType: SINGLE_ANSWER,
        question: "Is the Cartridge Tape Drive in the Control-Monitor Computer is referred to as the A10?",
        answered: false,
        bookmarked: false,
        optionList: [{option: "Yes", selected: false},
          {option: "No", selected: false}]
    },
    // {
    //   id: 6,
    //   type: FLOW_CHART,
    //   imageURL: imageFlowChart,
    //   answered: false,
    //   answer: "",
    //   question: "Why do you want to join the Navy?"
    // },
  ]
];

const initState = {
  page: 0,
  section: 0,
  time: 0,
  allQuestionsAnswered: false,
  totalSections: qArray.length,
  questionsArray: qArray[0]
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
        totalSections: qArray.length,
        questionsArray: state.questionsArray
      };

    case GO_TO_SECTION:
      return {
        page: 0,
        section: action.payload,
        time: sectionTimes[action.payload],
        allQuestionsAnswered: false,
        totalSections: qArray.length,
        questionsArray: qArray[action.payload]
      };

    case QUESTION_ANSWERED:
      return questionAnswered(state, action);

    case SET_TO_DEFAULT:
      qArray = [
        [
          {
            id: 1,
            type: MULTI_CHOICE,
            choiceType: SINGLE_ANSWER,
            question: "What are the two types of electrical communications?",
            answered: false,
            bookmarked: false,
            optionList: [{option: "Commercial and Navy", selected: false},
              {option: "Radio and wire", selected: false},
              {option: "Active and passive", selected: false},
              {option: "Simplex and duplex", selected: false}]
          },
          {
            id: 2,
            type: MULTI_CHOICE,
            choiceType: SINGLE_ANSWER,
            question: "What unit of measurement is used to express quantities of inductance?",
            answered: false,
            bookmarked: false,
            optionList: [{option: "Picofarads", selected: false}, {option: "Jules", selected: false}, {
              option: "Ohms",
              selected: false
            }, {option: "Microhenrys", selected: false}]
          },
          {
            id: 3,
            type: MULTI_CHOICE,
            choiceType: MULTIPLE_ANSWER,
            question: "When using frequencies above 30 MegaHertz, you are normally limited to using what range?",
            answered: false,
            bookmarked: false,
            optionList: [{option: "HF", selected: false},
              {option: "UHF", selected: false},
              {option: "Line-of-sight", selected: false},
              {option: "SATCOM", selected: false}]
          },
          {
            id: 4,
            type: MULTI_CHOICE,
            choiceType: MULTIPLE_ANSWER,
            question: "What is the final stage of a transmitter?",
            answered: false,
            bookmarked: false,
            optionList: [{option: "RF filter", selected: false},
              {option: "Pulse generator", selected: false},
              {option: "Power reduction", selected: false},
              {option: "Power amplifier", selected: false}]
          },
          {
            id: 5,
            type: MULTI_CHOICE,
            choiceType: MULTIPLE_ANSWER,
            question: "Which Receiver assembly provides the internal 5MHz reference signal?",
            answered: false,
            bookmarked: false,
            optionList: [{option: "A12", selected: false},
              {option: "A11", selected: false},
              {option: "A21", selected: false},
              {option: "A10", selected: false}]
          },
          {
            id: 6,
            type: MULTI_CHOICE,
            choiceType: MULTIPLE_ANSWER,
            question: "The ________ in an AM transmitter converts audio (sound) into electrical energy.",
            answered: false,
            bookmarked: false,
            optionList: [{option: "Microphone", selected: false},
              {option: "Speaker", selected: false},
              {option: "Pulse-generator", selected: false},
              {option: "Toner", selected: false}]
          },
          {
            id: 7,
            type: MULTI_CHOICE,
            choiceType: MULTIPLE_ANSWER,
            question: "What is another name for the positive electrode?",
            answered: false,
            bookmarked: false,
            optionList: [{option: "Anode", selected: false},
              {option: "Cathode", selected: false},
              {option: "Diode", selected: false},
              {option: "Triode", selected: false}]
          },
          {
            id: 8,
            type: MULTI_CHOICE,
            choiceType: MULTIPLE_ANSWER,
            question: "One cycle is equal to how many degrees of rotation of a conductor in a magnetic field?",
            answered: false,
            bookmarked: false,
            optionList: [{option: "90°", selected: false},
              {option: "180°", selected: false},
              {option: "270°", selected: false},
              {option: "360°", selected: false}]
          },
          {
            id: 9,
            type: MULTI_CHOICE,
            choiceType: MULTIPLE_ANSWER,
            question: "In the example 1A6CR3, what is the assembly designator?",
            answered: false,
            bookmarked: false,
            optionList: [{option: "1A", selected: false},
              {option: "A6", selected: false},
              {option: "6CR", selected: false},
              {option: "CR3", selected: false}]
          },
          {
            id: 10,
            type: MULTI_CHOICE,
            choiceType: MULTIPLE_ANSWER,
            question: "What is the frequency range of EHF communications?",
            answered: false,
            bookmarked: false,
            optionList: [{option: "30-300 GHz", selected: false},
              {option: "3-30 GHz", selected: false},
              {option: "300 MHZ - 3GHz", selected: false},
              {option: "30-300 MHz", selected: false}]
          },
          {
            id: 11,
            type: MULTI_CHOICE,
            choiceType: MULTIPLE_ANSWER,
            question: "A message transmitted on several frequencies at the same time is what type of transmission?",
            answered: false,
            bookmarked: false,
            optionList: [{option: "Time-diversity", selected: false},
              {option: "Frequency-diversity", selected: false},
              {option: "Space-diversity", selected: false},
              {option: "Modulation-diversity", selected: false}]
          },
          {
            id: 12,
            type: MULTI_CHOICE,
            choiceType: MULTIPLE_ANSWER,
            question: "The ________ extracts the modulating audio signal.",
            answered: false,
            bookmarked: false,
            optionList: [{option: "Detector", selected: false},
              {option: "Extractor", selected: false},
              {option: "Toner", selected: false},
              {option: "Modulator", selected: false}]
          },
          {
            id: 13,
            type: MULTI_CHOICE,
            choiceType: MULTIPLE_ANSWER,
            question: "Which of the following is NOT one of the four basic receiver characteristics?",
            answered: false,
            bookmarked: false,
            optionList: [{option: "Sensitivity", selected: false},
              {option: "Amplification", selected: false},
              {option: "Noise", selected: false},
              {option: "Fidelity", selected: false}]
          },
          {
            id: 14,
            type: MULTI_CHOICE,
            choiceType: MULTIPLE_ANSWER,
            question: "What does manual gain control do to strong and weak signals?",
            answered: false,
            bookmarked: false,
            optionList: [{option: "Amplifies the strong and attenuates the weak", selected: false},
              {option: "Selects the strong and rejects the weak", selected: false},
              {option: "Attenuates the strong and amplifies the weak", selected: false},
              {option: "Rejects the strong and selects the weak", selected: false}]
          },
          {
            id: 15,
            type: MULTI_CHOICE,
            choiceType: MULTIPLE_ANSWER,
            question: "What are the terms used to describe an open or closed telegraph circuit?",
            answered: false,
            bookmarked: false,
            optionList: [{option: "Dot and dash", selected: false},
              {option: "Start and stop", selected: false},
              {option: "Hack and slash", selected: false},
              {option: "Space and mark", selected: false}]
          }],

        [
          {
            id: 1,
            type: MULTI_CHOICE,
            choiceType: SINGLE_ANSWER,
            videoURL: "http://www.navy.mil/media/flashvideo/wwr/wwr_03122018.mp4",
            question: "When is women's history month?",
            answered: false,
            bookmarked: false,
            optionList: [{option: "January", selected: false},
              {option: "February", selected: false},
              {option: "March", selected: false},
              {option: "April", selected: false}]
          },
          {
            id: 2,
            type: MULTI_CHOICE,
            choiceType: SINGLE_ANSWER,
            imageURL: image,
            question: "What is this aircraft carrier?",
            answered: false,
            bookmarked: false,
            optionList: [{option: "Nimitz-class", selected: false},
              {option: "Gerald R. Ford-class", selected: false},
              {option: "Lexington-class", selected: false},
              {option: "Kitty Hawk-class", selected: false}]
          },
          {
            id: 3,
            type: SHORT_ANSWER,
            answered: false,
            bookmarked: false,
            answer: "",
            question: "When using frequencies above 30 megahertz, you are normally limited to using what range?",
          },
          {
            id: 4,
            type: MULTI_CHOICE,
            choiceType: SINGLE_ANSWER,
            question: "RF filter is the final stage of a transmitter.",
            answered: false,
            bookmarked: false,
            optionList: [{option: "True", selected: false},
              {option: "False", selected: false}]
          },
          {
            id: 5,
            type: ESSAY,
            answered: false,
            bookmarked: false,
            answer: "",
            question: "Why do you want to join the Navy?"
          },
          {
              id: 6,
              type: MULTI_CHOICE,
              choiceType: SINGLE_ANSWER,
              question: "Is the Cartridge Tape Drive in the Control-Monitor Computer is referred to as the A10?",
              answered: false,
              bookmarked: false,
              optionList: [{option: "Yes", selected: false},
                {option: "No", selected: false}]
          },
          // {
          //   id: 6,
          //   type: FLOW_CHART,
          //   imageURL: imageFlowChart,
          //   answered: false,
          //   answer: "",
          //   question: "Why do you want to join the Navy?"
          // },
        ]
      ];
      return {
        page: 0,
        section: 0,
        time: sectionTimes[0],
        allQuestionsAnswered: false,
        totalSections: qArray.length,
        questionsArray: qArray[0]
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
    totalSections: qArray.length,
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
    totalSections: qArray.length,
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
    totalSections: qArray.length,
    questionsArray: nextQuestionsArray
  };
}