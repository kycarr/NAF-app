const mongoose = require ('mongoose');
const PORT = process.env.PORT || 8080;

//loading Models
const User = require('../models/User');
const Answer = require('../models/Answer');
const Module = require('../models/Module');
const Test = require('../models/Test');
const Section = require('../models/Section');
const Item = require('../models/Item');
const Session = require('../models/Session');
const Task = require('../models/Task');
const Topic = require('../models/Topic');
const StudentReport = require('../models/StudentReport');


exports.fetchInstructorData = async (req,res) => {

	const sessionId = mongoose.Types.ObjectId(req.query['sessionId']);
	const session = await Session.findById(sessionId).populate('user');
	// console.log(session);
	const task = await Task.findById(session.task).populate('test');
	console.log(task);
	//console.log(task);
	const itemsForTask = await Item.find({test: task.test});

	const passObject = {};
	const failObject = {};

	for(let i=0; i<itemsForTask.length; i++) 
	{
		const currentItem = itemsForTask[i];
		const topic = await Topic.findOne({id: currentItem.topicId});
		const topicName = topic.name;
		const answerForCurrentItem = await Answer.findOne({item: currentItem._id, session: sessionId, task: task._id});
		if(!answerForCurrentItem) {
			//mark it as fail as no answer provided
			failObject[topicName] = failObject.hasOwnProperty(topicName) === true ? failObject[topicName] + 1 : 1;
		} else {
			const didUserPass = answerForCurrentItem.pass;
			if(didUserPass === true)
			{
				//mark is as pass
				passObject[topicName] = passObject.hasOwnProperty(topicName) === true ? passObject[topicName] + 1 : 1;
			} else {
				//mark it as fail
				failObject[topicName] = failObject.hasOwnProperty(topicName) === true ? failObject[topicName] + 1 : 1;
			}

		}

	}
	console.log('Pass Object');
	console.log(passObject);
	console.log('Fail Object');
	console.log(failObject);

	const passFailObject = {};

	for(let passObjectKey in passObject) {
		passFailObject[passObjectKey] = {'pass' : passObject[passObjectKey]};
	}

	for(let failObjectKey in failObject) {
		passFailObject[failObjectKey] = {...passFailObject[failObjectKey], 'fail': failObject[failObjectKey]};		
	}



	for(let key in passFailObject) {

		if(!passFailObject[key].hasOwnProperty("pass")) {
			passFailObject[key]['pass'] = 0;
		}

		if(!passFailObject[key].hasOwnProperty("fail")) {
			passFailObject[key]['fail'] = 0;
		}	
	}

	console.log('passFailObject');
	console.log(passFailObject);

	const responseJSON = { 'topics': [] };
	for(let key in passFailObject){
		// console.log(key);
		let tempObj = {};
		tempObj['label'] = key;
		tempObj['pass'] = passFailObject[key]['pass'];
		tempObj['fail'] = passFailObject[key]['fail'];
		responseJSON['topics'].push(tempObj);
	}

	
	const userObject = {
		'name' : session.user.name,
		'username' : session.user.username
	};
	responseJSON['user'] = userObject;

	const studentReport = await StudentReport.findOne({session: sessionId});
	const resultsObject = {
		className: 'Class 1',
		testName: studentReport.testName,
		dateCompleted: studentReport.testDate,
		finished: 10,
		inComplete: 4,
		notStart: 1,
		average: '50%',
		pass: '53%',
	};

	responseJSON['results'] = resultsObject;


	// responseJSON['reportingData'] = studentReport;

	responseJSON['requirementsNotMetObject'] = studentReport.requirementsNotMetObject;
	res.json(responseJSON);

	//res.json(passFailObject);

}