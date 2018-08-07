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


const calculateTestResult = require('../utils/calculateTestResult');

exports.fetchStudentAnswers = async(req,res) => {

      console.log('Inside the student fetch answers route');
      const sessionId = mongoose.Types.ObjectId(req.query['sessionId']);
      if(sessionId === undefined || sessionId === null) {
        res.status(400).json({
          'ERROR': 'Session Id not defined'
        });
      }

      const session = await Session.findById(sessionId).populate('user');
      
      if(session === undefined || session === null || session.task === undefined) {
        res.status(404).json({
          'ERROR' : 'Data not found'
        });
      }

      const studentReport = await StudentReport.findOne({session: sessionId});
      console.log('Student Report', studentReport);
      const responseObject = {};
      responseObject['user'] = studentReport.user;
      responseObject['testDate'] = studentReport.testDate;
     

      const task = await Task.findById(session.task).populate('test');
      const items = await Item.find({test: task.test});
      let answersList = await Answer.find({session: sessionId, task: session.task});
      responseObject['questionResponses'] = {};


      for(let i=0; i<items.length;i++) {
          const currentItem = items[i];
          const topic = await Topic.findOne({id: currentItem.topicId});
          let currentAnswer = answersList.filter(element => element.item.toString() === currentItem._id.toString());
          let pass = false;

          if(currentAnswer === undefined || currentAnswer.length === 0) {
              currentAnswer ='' ;
          } else {
              pass = currentAnswer[0].pass;
              currentAnswer = currentAnswer[0].answers;
          }

          let type = currentItem.type;
          if(type == "Multiple_choice") {
              type = currentItem.choiceType;
          }
          const correctAnswer = currentItem.correctAnswer;
          const topic_id = currentItem.topicId;
          const topicName = topic.name;
          const questionText = currentItem.question;
          const object = {
            'question' : questionText,
            'userProvidedAnswer' : currentAnswer,
            'correctAnswer' : correctAnswer,
            'type': type,
            'topicName': topicName,
            'pass': pass

          } 
          responseObject['questionResponses'][i] = object;
      }

      responseObject['userId'] = session.user._id;
      responseObject['username'] = session.user.username;
      responseObject['testName'] = studentReport.testName;

      const {testName, testScore, testScorePercentage, testResult, requirementsNotMetObject, topicValue, topicLabel, byTopic} = studentReport;

      responseObject['reportingData'] = {testName, testScore, testScorePercentage, testResult, requirementsNotMetObject, topicValue, topicLabel, byTopic};



      res.json(responseObject);

}

/*
exports.fetchStudentAnswers = async (req,res) => {

      console.log('Inside the student fetch answers route');
      const sessionId = mongoose.Types.ObjectId(req.query['sessionId']);

      if(sessionId === undefined || sessionId === null) {
        res.status(400).json({
          'ERROR': 'Session Id not defined'
        });
      }

      const session = await Session.findById(sessionId).populate('user');

      if(session === undefined || session === null || session.task === undefined) {
        res.status(404).json({
          'ERROR' : 'Data not found'
        });
      }

      const task = await Task.findById(session.task).populate('test');
      let answersList = await Answer.find({session: sessionId, task: session.task});
      const items = await Item.find({test: task.test});
      
      const answerResponse = {};
      answerResponse['user'] = session.user.name;
      answerResponse['testDate'] = task.date;
      answerResponse['questionResponses'] = {};
      answerResponse['testName'] = task.test.testName;

      for(let i=0; i<items.length;i++) {
          const currentItem = items[i];
          const topic = await Topic.findOne({id: currentItem.topicId});
          let currentAnswer = answersList.filter(element => element.item.toString() === currentItem._id.toString());
          let pass = false;

          if(currentAnswer === undefined || currentAnswer.length === 0) {
              currentAnswer ='' ;
          } else {
              pass = currentAnswer[0].pass;
              currentAnswer = currentAnswer[0].answers;
          }

          let type = currentItem.type;
          if(type == "Multiple_choice") {
              type = currentItem.choiceType;
          }
          const correctAnswer = currentItem.correctAnswer;
          const topic_id = currentItem.topicId;
          const topicName = topic.name;
          const questionText = currentItem.question;
          const object = {
            'question' : questionText,
            'userProvidedAnswer' : currentAnswer,
            'correctAnswer' : correctAnswer,
            'type': type,
            'topicName': topicName,
            'pass': pass

          } 
          // answerResponse[i] = [currentAnswer, correctAnswer, type, topic_id];
          answerResponse['questionResponses'][i] = object;
      }
      answerResponse['userId'] = session.user._id;
      const reportingData = calculateTestResult(answerResponse);
      task.score = reportingData['testScore'];
      task.testResult = reportingData['testResult'];
      task.save()
        .then(task => console.log('Task Successfully saved'))
        .catch(error => console.log('ERROR in saving task with updated score and result'));

      answerResponse['reportingData'] = reportingData;

      res.json(answerResponse);
}

*/

exports.fetchStudentSessions = async(req,res) => {
  console.log('Inside the fetch student sessions route');
  const userId = mongoose.Types.ObjectId(req.query['userId']);


  if(userId === undefined || userId === null) {
      res.status(400).json({
          'ERROR': 'User Id not defined'
      })
  }

  const user = await User.findById(userId).populate('sessions');

  if(user === undefined || user === null || user.sessions === undefined) {
    res.status(404).json({
      'ERROR': 'Data not found'
    })
  }

  const responseObject = {};

  for(let i = 0; i<user.sessions.length; i++) {
    const session = user.sessions[i];
    const currentTask = await Task.findById(session.task).populate('test');
    const currentTestName = currentTask.test.testName;
    if(!(currentTestName in responseObject)) 
      responseObject[currentTestName] = {testName: currentTestName, attempts: 1, date: new Date(currentTask.date), testScore: currentTask.score, testResult: currentTask.testResult, session: session._id};
    else {
      responseObject[currentTestName]['testName'] = currentTestName;
      responseObject[currentTestName]['attempts']+=1;
      responseObject[currentTestName]['date'] = new Date(currentTask.date);
      responseObject[currentTestName]['session'] = session._id;
      if(currentTask.score != undefined) {
        responseObject[currentTestName]['testScore'] = currentTask.score ;
        responseObject[currentTestName]['testResult'] = currentTask.testResult ;
       }
    }
  }

  res.json(responseObject);
}


