const image = "/images/nimitz3.jpg";
const MULTI_CHOICE = "Multiple_choice";
const SINGLE_ANSWER = "Single_Answer";
const MULTIPLE_ANSWER = "Multiple_Answer";
const ESSAY = "Essay";
const SHORT_ANSWER = "Short_Answer";
const FLOW_CHART = "flow_chart";

let qArray = [
	[
		{
			id: 1,
      		type: MULTI_CHOICE,
      		choiceType: SINGLE_ANSWER,
      		question: "A bird traveled 72 miles in 6 hours flying at constant speed. At this rate, how many miles did the bird travel in 5 hours?",
      		topicId: 5,
      		bookmarked: false,
      		optionList: [{option: "12", selected: false},
        				{option: "30", selected: false},
        				{option: "60", selected: false},
        				{option: "14.4", selected: false}],
      		correctAnswer: ['60']
		},
		{
			id: 2,
      		type: MULTI_CHOICE,
      		choiceType: SINGLE_ANSWER,
      		question: "If 2x - 4 = 10, then what does x equal: ",
      		topicId: 5,
      		bookmarked: false,
      		optionList: [{option: "7", selected: false},
        				{option: "3", selected: false},
        				{option: "6", selected: false},
        				{option: "2", selected: false}],
      		correctAnswer: ['7']
		},
		{
			id: 3,
      		type: MULTI_CHOICE,
      		choiceType: SINGLE_ANSWER,
      		question: "If the tire of a car rotates at a constant speed of 552 times in one minute, how many times will the tire rotate in half-an-hour?  ",
      		topicId: 5,
      		bookmarked: false,
      		optionList: [{option: "276", selected: false},
        				{option: "5520", selected: false},
        				{option: "8250", selected: false},
        				{option: "16560", selected: false}],
      		correctAnswer: ['16560']
		},
		{
			id: 4,
      		type: MULTI_CHOICE,
      		choiceType: MULTIPLE_ANSWER,
      		question: "If (x)(x) = 36, then what does x equal? Select all that apply.",
      		topicId: 5,
      		bookmarked: false,
      		optionList: [{option: "6", selected: false},
        				{option: "-6", selected: false},
        				{option: "36", selected: false},
        				{option: "1", selected: false}],
      		correctAnswer: ['6','-6']
		},
		{
			id: 5,
      		type: MULTI_CHOICE,
      		choiceType: SINGLE_ANSWER,
      		question: "One in every 9 people in a town vote for party A. All others vote for party B. How many people vote for party B in a town of 810?",
      		topicId: 5,
      		bookmarked: false,
      		optionList: [{option: "90", selected: false},
        				{option: "720", selected: false},
        				{option: "801", selected: false},
        				{option: "819", selected: false}],
      		correctAnswer: ['720']
		},
		{
			id: 6,
      		type: MULTI_CHOICE,
      		choiceType: SINGLE_ANSWER,
      		question: "Antagonize is similar to: ",
      		topicId: 6,
      		bookmarked: false,
      		optionList: [{option: "embarrass", selected: false},
        				{option: "struggle", selected: false},
        				{option: "provoke", selected: false},
        				{option: "worship", selected: false}],
      		correctAnswer: ['provoke']
		},
		{
			id: 7,
      		type: MULTI_CHOICE,
      		choiceType: SINGLE_ANSWER,
      		question: "Wilted is similar to: ",
      		topicId: 6,
      		bookmarked: false,
      		optionList: [{option: "left", selected: false},
        				{option: "limp", selected: false},
        				{option: "budding", selected: false},
        				{option: "request", selected: false}],
      		correctAnswer: ['limp']
		},
		{
			id: 8,
      		type: MULTI_CHOICE,
      		choiceType: SINGLE_ANSWER,
      		question: `A lamb’s thick winter coat keeps it warm during the cold winter months. 
      				   When the summer brings sunny days, the sheep doesn’t need its thick coat and the sheep’s wool is sheared. 
      				   That wool is made into yarn, further processed, and then transformed into sweaters, socks, pants, skirts, and blankets.
      		           
      		           According to the passage, which of the following best describes why sheep are sheared? `,
      		topicId: 6,
      		bookmarked: false,
      		optionList: [{option: "Because they get too hot in the summer", selected: false},
        				{option: "So we can use the wool to make clothes", selected: false},
        				{option: "The sheep’s coat is dangerous to them", selected: false},
        				{option: "They look better without their coat", selected: false}],
      		correctAnswer: ['So we can use the wool to make clothes']
		},
		{
			id: 9,
      		type: MULTI_CHOICE,
      		choiceType: SINGLE_ANSWER,
      		question: `American Sign Language (ASL) is a conceptual language, and the way those concepts are put together is called syntax. 
      				   In ASL, a statement usually begins with the main idea and then the details follow. 
      				   Very different from English, ASL syntax is based on what is most important to the person signing. 


      				   This author implies that`,
      		topicId: 6,
      		bookmarked: false,
      		optionList: [{option: "English can never be conceptual", selected: false},
        				{option: " Every language should have the same syntax", selected: false},
        				{option: "American Sign Language has incorrect syntax", selected: false},
        				{option: "English does not always begin with what is most important", selected: false}],
      		correctAnswer: ['English does not always begin with what is most important']
		},
		{
			id: 10,
      		type: MULTI_CHOICE,
      		choiceType: SINGLE_ANSWER,
      		question: `Electrical power can be calculated with the following formula: P = I × V
						What does the letter I represent in this formula?`,
      		topicId: 7,
      		bookmarked: false,
      		optionList: [{option: "watts", selected: false},
        				{option: "voltage", selected: false},
        				{option: "current", selected: false},
        				{option: "impedance", selected: false}],
      		correctAnswer: ['current']
		},
		{
			id: 11,
      		type: MULTI_CHOICE,
      		choiceType: SINGLE_ANSWER,
      		question: `Three amps equals how many milliamps?`,
      		topicId: 7,
      		bookmarked: false,
      		optionList: [{option: "0.003", selected: false},
        				{option: "30", selected: false},
        				{option: "300", selected: false},
        				{option: "3000", selected: false}],
      		correctAnswer: ['3000']
		},
		{
			id: 12,
      		type: MULTI_CHOICE,
      		choiceType: SINGLE_ANSWER,
      		question: `What device would you use to measure electrical resistance in a circuit?`,
      		topicId: 7,
      		bookmarked: false,
      		optionList: [{option: "ohmmeter", selected: false},
        				{option: "voltmeter", selected: false},
        				{option: "ammeter", selected: false},
        				{option: "electric resistor", selected: false}],
      		correctAnswer: ['ohmmeter']
		}

	],
	[
		{
			id: 1,
      		type: MULTI_CHOICE,
      		choiceType: SINGLE_ANSWER,
      		question: "If Kayla left a $10.47 tip on a breakfast that cost $87.25, what percentage was the tip?",
      		topicId: 8,
      		bookmarked: false,
      		optionList: [{option: "8.3%", selected: false},
        				{option: "12%", selected: false},
        				{option: "13%", selected: false},
        				{option: "15%", selected: false}],
      		correctAnswer: ['12%']
		},
		{
			id: 2,
      		type: MULTI_CHOICE,
      		choiceType: SINGLE_ANSWER,
      		question: "Five years ago, Amy was three times as old as Mike. If Mike is 10 years old now, how old is Amy?",
      		topicId: 8,
      		bookmarked: false,
      		optionList: [{option: "15", selected: false},
        				{option: "20", selected: false},
        				{option: "25", selected: false},
        				{option: "30", selected: false}],
      		correctAnswer: ['20']
		},
		{
			id: 3,
      		type: MULTI_CHOICE,
      		choiceType: SINGLE_ANSWER,
      		question: "Sofía is driving to Texas. She travels at 70 kilometers per hour for 2 hours, and 63 kilometers per hour for 5 hours. Over the 7 hour time period what was Sofía’s average speed?",
      		topicId: 8,
      		bookmarked: false,
      		optionList: [{option: "64kmph", selected: false},
        				{option: "65kmph", selected: false},
        				{option: "66kmph", selected: false},
        				{option: "67kmph", selected: false}],
      		correctAnswer: ['65kmph']
		},
		{
			id: 4,
      		type: MULTI_CHOICE,
      		choiceType: SINGLE_ANSWER,
      		question: "Maya purchased a boat for $18,340. Its value depreciated by 15% in the first year she owned it. What was her boat worth at the end of this first year?",
      		topicId: 8,
      		bookmarked: false,
      		optionList: [{option: "$2751", selected: false},
        				{option: "$21091", selected: false},
        				{option: "$12227", selected: false},
        				{option: "$15589", selected: false}],
      		correctAnswer: ['$15589']
		},
		{
			id: 5,
      		type: MULTI_CHOICE,
      		choiceType: SINGLE_ANSWER,
      		question: "The radar system beeps once every second. How many times will it beep in 3 days?",
      		topicId: 8,
      		bookmarked: false,
      		optionList: [{option: "10800", selected: false},
        				{option: "86400", selected: false},
        				{option: "129600", selected: false},
        				{option: "259200", selected: false}],
      		correctAnswer: ['259200']
		}, 
		{
     		id: 6,
      		type: ESSAY,
      		topicId: 4,
      		bookmarked: false,
      		answer: "",
      		question: ` Answer 1 of the following questions with a written statement. Min 150 words.  Max 500 words.

						A. How has your education contributed to who you are today?
						B. Briefly describe your long- and short-term goals.
						C. Who in your life has been your biggest influence and why?
					  `,
      		correctAnswer: ["ESSAY"]
    	},
    	{
			id: 7,
      		type: MULTI_CHOICE,
      		choiceType: SINGLE_ANSWER,
      		question: "Air is less dense than water because",
      		topicId: 9,
      		bookmarked: false,
      		optionList: [{option: "it is lighter", selected: false},
        				{option: "its molecules are further apart", selected: false},
        				{option: "its molecules are closer together", selected: false},
        				{option: "it moves more quickly and easily", selected: false}],
      		correctAnswer: ['its molecules are further apart']
		},
		{
			id: 8,
      		type: MULTI_CHOICE,
      		choiceType: SINGLE_ANSWER,
      		question: "100° C is equal to",
      		topicId: 9,
      		bookmarked: false,
      		optionList: [{option: "32° F", selected: false},
        				{option: "100° F", selected: false},
        				{option: "200° F", selected: false},
        				{option: "212° F", selected: false}],
      		correctAnswer: ['212° F']
		},
		{
			id: 9,
      		type: MULTI_CHOICE,
      		choiceType: SINGLE_ANSWER,
      		question: "Salt helps to melt ice because it",
      		topicId: 9,
      		bookmarked: false,
      		optionList: [{option: "dissolves in water to form an acid", selected: false},
        				{option: "chemically destroys the water molecules", selected: false},
        				{option: "lowers the temperature at which water freezes", selected: false},
        				{option: "is attracted to concrete sidewalks below the ice", selected: false}],
      		correctAnswer: ['lowers the temperature at which water freezes']
		}

	]
]

module.exports = qArray;