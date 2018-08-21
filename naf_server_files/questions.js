const image = "/images/nimitz3.jpg";
const MULTI_CHOICE = "Multiple_choice";
const SINGLE_ANSWER = "Single_Answer";
const MULTIPLE_ANSWER = "Multiple_Answer";
const ESSAY = "Essay";
const SHORT_ANSWER = "Short_Answer";
const FLOW_CHART = "flow_chart";
const HOTSPOT = "Hot_Spot";
const TABLE_FILL = "Table_Fill";

let sectionTimes = [15 * 60, 10 * 60];
let qArray = [
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
      choiceType: MULTIPLE_ANSWER,
      question: "When using frequencies above 30 MegaHertz, you are normally limited to using what range?",
      topicId: 2,
      bookmarked: false,
      optionList: [{option: "HF", selected: false},
        {option: "UHF", selected: false},
        {option: "Line-of-sight", selected: false},
        {option: "SATCOM", selected: false}],
      correctAnswer: ['HF','UHF']
    },
    {
      id: 4,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "What is the final stage of a transmitter?",
      topicId: 2,
      bookmarked: false,
      optionList: [{option: "RF filter", selected: false},
        {option: "Pulse generator", selected: false},
        {option: "Power reduction", selected: false},
        {option: "Power amplifier", selected: false}],
      correctAnswer: ['Power amplifier', 'Pulse generator']
    },
    {
      id: 5,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "Which Receiver assembly provides the internal 5MHz reference signal?",
      topicId: 2,
      bookmarked: false,
      optionList: [{option: "A12", selected: false},
        {option: "A11", selected: false},
        {option: "A21", selected: false},
        {option: "A10", selected: false}],
      correctAnswer: ['A12','A11']
    },
    {
      id: 6,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "The ________ in an AM transmitter converts audio (sound) into electrical energy.",
      topicId: 2,
      bookmarked: false,
      optionList: [{option: "Microphone", selected: false},
        {option: "Speaker", selected: false},
        {option: "Pulse-generator", selected: false},
        {option: "Toner", selected: false}],
      correctAnswer: ['Microphone','Speaker']
    },
    {
      id: 7,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "What is another name for the positive electrode?",
      topicId: 2,
      bookmarked: false,
      optionList: [{option: "Anode", selected: false},
        {option: "Cathode", selected: false},
        {option: "Diode", selected: false},
        {option: "Triode", selected: false}],
      correctAnswer: ['Cathode']
    },
    {
      id: 8,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "One cycle is equal to how many degrees of rotation of a conductor in a magnetic field?",
      topicId: 2,
      bookmarked: false,
      correctAnswer: ['360°'],
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
      topicId: 2,
      bookmarked: false,
      optionList: [{option: "1A", selected: false},
        {option: "A6", selected: false},
        {option: "6CR", selected: false},
        {option: "CR3", selected: false}],
      correctAnswer: ['A6','1A']
    },
    {
      id: 10,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "What is the frequency range of EHF communications?",
      topicId: 2,
      bookmarked: false,
      optionList: [{option: "30-300 GHz", selected: false},
        {option: "3-30 GHz", selected: false},
        {option: "300 MHZ - 3GHz", selected: false},
        {option: "30-300 MHz", selected: false}],
      correctAnswer: ["300 MHZ - 3GHz"]
    },
    {
      id: 11,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "A message transmitted on several frequencies at the same time is what type of transmission?",
      topicId: 2,
      bookmarked: false,
      optionList: [{option: "Time-diversity", selected: false},
        {option: "Frequency-diversity", selected: false},
        {option: "Space-diversity", selected: false},
        {option: "Modulation-diversity", selected: false}],
      correctAnswer: ["Space-diversity"]
    },
    {
      id: 12,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "The ________ extracts the modulating audio signal.",
      topicId: 2,
      bookmarked: false,
      optionList: [{option: "Detector", selected: false},
        {option: "Extractor", selected: false},
        {option: "Toner", selected: false},
        {option: "Modulator", selected: false}],
      correctAnswer: ["Extractor"]
    },
    {
      id: 13,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "Which of the following is NOT one of the four basic receiver characteristics?",
      topicId: 2,
      bookmarked: false,
      optionList: [{option: "Sensitivity", selected: false},
        {option: "Amplification", selected: false},
        {option: "Noise", selected: false},
        {option: "Fidelity", selected: false}],
      correctAnswer: ["Noise"]
    },
    {
      id: 14,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "What does manual gain control do to strong and weak signals?",
      topicId: 2,
      bookmarked: false,
      optionList: [{option: "Amplifies the strong and attenuates the weak", selected: false},
        {option: "Selects the strong and rejects the weak", selected: false},
        {option: "Attenuates the strong and amplifies the weak", selected: false},
        {option: "Rejects the strong and selects the weak", selected: false}],
      correctAnswer: ["Attenuates the strong and amplifies the weak"]
    },
    {
      id: 15,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "What are the terms used to describe an open or closed telegraph circuit?",
      topicId: 2,
      bookmarked: false,
      optionList: [{option: "Dot and dash", selected: false},
        {option: "Start and stop", selected: false},
        {option: "Hack and slash", selected: false},
        {option: "Space and mark", selected: false}],
      correctAnswer: ["Space and mark"]
    }],

  [
    {
      id: 1,
      type: MULTI_CHOICE,
      choiceType: SINGLE_ANSWER,
      videoURL: "http://www.navy.mil/media/flashvideo/wwr/wwr_03122018.mp4",
      question: "When is women's history month?",
      topicId: 1,
      bookmarked: false,
      optionList: [{option: "January", selected: false},
        {option: "February", selected: false},
        {option: "March", selected: false},
        {option: "April", selected: false}],
      correctAnswer: ["April"]
    },
    {
      id: 2,
      type: MULTI_CHOICE,
      choiceType: SINGLE_ANSWER,
      imageURL: image,
      question: "What is this aircraft carrier?",
      topicId: 1,
      bookmarked: false,
      optionList: [{option: "Nimitz-class", selected: false},
        {option: "Gerald R. Ford-class", selected: false},
        {option: "Lexington-class", selected: false},
        {option: "Kitty Hawk-class", selected: false}],
      correctAnswer: ["Kitty Hawk-class"]
    },
    {
      id: 3,
      type: SHORT_ANSWER,
      topicId: 3,
      bookmarked: false,
      answer: "",
      question: "When using frequencies above 30 megahertz, you are normally limited to using what range?",
      correctAnswer: ["ESSAY"]
    },
    {
      id: 4,
      type: MULTI_CHOICE,
      choiceType: SINGLE_ANSWER,
      question: "RF filter is the final stage of a transmitter.",
      topicId: 1,
      bookmarked: false,
      optionList: [{option: "True", selected: false},
        {option: "False", selected: false}],
      correctAnswer: ["True"]
    },
    {
      id: 5,
      type: ESSAY,
      topicId: 4,
      bookmarked: false,
      answer: "",
      question: "Why do you want to join the Navy?",
      correctAnswer: ["ESSAY"]
    },
    {
      id: 6,
      type: MULTI_CHOICE,
      choiceType: SINGLE_ANSWER,
      question: "Is the Cartridge Tape Drive in the Control-Monitor Computer is referred to as the A10?",
      topicId: 1,
      bookmarked: false,
      optionList: [{option: "Yes", selected: false},
        {option: "No", selected: false}],
      correctAnswer: ["Yes"]
    },
    {
      id: 7,
      type: TABLE_FILL,
      question: "For each switch symbol in the table, please enter a number for the number of poles, throws, and breaks.",
      topicId: 1,
      bookmarked: false,
      columns: [
        {Header: "Symbol",accessor: "symbol"},
        {Header: "Number of Poles",accessor: "poles"},
        {Header: "Number of Throws",accessor: "throws"},
        {Header: "Number of Breaks",accessor: "breaks"}
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
      ]
    },
    {
      id: 8,
      type: HOTSPOT,
      question: "On the schematic diagram for the radar power supply (unit 4), there are four fuses. Click on the region for fuses 3 and 4.",
      topicId: 4,
      bookmarked: false,
      limit: 2,
      correctAnswer: ["Yes"]
    }
  ]
];

module.exports = qArray;