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

function calculateTestResult(rawData) {
  console.log('Calculating Test Result');
    let correctness = [];
    let topicsScore = [];
    let topicsScoreP = [];
    let topicValue = [];
    let topicsIndex=0;
    let totalPass=0;
    let topicLabel = [];


    if(Object.keys(rawData['questionResponses']).length > 0) {
      for(let key in rawData['questionResponses']) {

          if(rawData['questionResponses'][key].pass === true) {
            correctness[key] = true;
            totalPass++;
          }else {
            correctness[key] = false;
          }

          if(topicValue[rawData['questionResponses'][key].topicName] === undefined){
            topicValue[rawData['questionResponses'][key].topicName] = 1;
          } else {
            topicValue[rawData['questionResponses'][key].topicName] +=1;
          }

          if(correctness[key] === true) {
            if(topicsScoreP[rawData['questionResponses'][key].topicName] === undefined) {
              topicsScoreP[rawData['questionResponses'][key].topicName]=1;
            }else {
              topicsScoreP[rawData['questionResponses'][key].topicName] +=1;
            }
          }
      }
    }

    for(let key in topicValue) {
      if(!(key in topicsScoreP)){
        topicsScoreP[key]=0;   //this is for topics that might have zero score
      }
    }

    for(let key in topicsScoreP) {
      console.log(100*(topicsScoreP[key]/topicValue[key]));
      topicValue.push(100*(topicsScoreP[key]/topicValue[key]));
      topicLabel.push(key);
    }

    let totalScore = correctness.length>1 ? Math.round(100*totalPass/correctness.length,1):0;

    let requirementsNotMetObject = {
      'Major' : [],
      'Minor' : [],
      'Critical' : []
    };

    for(let i=0; i<topicValue.length; i++) {
        if(topicValue[i] <= 30) {
          requirementsNotMetObject['Major'].push(' ' + topicLabel[i]);
        } else if(topicValue[i] >30 && topicValue[i] <=60) {
          requirementsNotMetObject['Minor'].push(' ' + topicLabel[i]);
        }
    }

    let testScore = `${totalPass}/${correctness.length}`;
    let testScorePercentage = `${totalScore} %`;
    let testResult = totalScore>60?'PASS':'FAIL';
 

    const reportingData = {
      'testName':rawData.testName,
      'testScore': testScore,
      'testScorePercentage': testScorePercentage,
      'testResult': testResult,
      'requirementsNotMetObject': requirementsNotMetObject,
      'topicValue': topicValue,
      'topicLabel': topicLabel
    };

    console.log(reportingData);

    return reportingData;

}

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
      console.log(task);
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

  console.log( user.sessions.length);

  for(let i = 0; i<user.sessions.length; i++) {
    const session = user.sessions[i];
    const currentTask = await Task.findById(session.task).populate('test');
    console.log(currentTask);
    const currentTestName = currentTask.test.testName;
    if(!(currentTestName in responseObject)) 
      responseObject[currentTestName] = {testName: "Test One", attempts: 1, date: new Date(currentTask.date), testScore: currentTask.score, testResult: currentTask.testResult  };
    else {
      responseObject[currentTestName]['testName'] = currentTestName;

      responseObject[currentTestName]['attempts']+=1;
      responseObject[currentTestName]['date'] = new Date(currentTask.date);
      //responseObject[currentTestName]['session'] = session._id;
      if(currentTask.score != undefined) {
        responseObject[currentTestName]['testScore'] = currentTask.score ;
        responseObject[currentTestName]['testResult'] = currentTask.testResult ;
       }
    }
  }

  res.json(responseObject);
}


