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
const StudentReport = require('../models/StudentReport');
const Topic = require('../models/Topic');

//loading utils
const calculateTestResult = require('../utils/calculateTestResult');

exports.index = (req,res) => {
    console.log('Server is running');
    res.send(`Server started on port ${PORT}`);

}

exports.login = async (req,res) => {
    console.log("Inside login route");
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne( {
      username: username,
      password: password
    });
    console.log(user);
    if(!user) {
      res.json({loginFailed: true});
    }
    console.log(user);
    
    res.status(200).json({
      id: user._id,
      name: user.name,
      username: req.body.username
    });
}

exports.get_questions_for_test = async (req,res) => {
   console.log("Inside questions route");
   console.log(req.body);
   let { userId, testParamName } = req.body;
   const test = await Test.findOne({testName: testParamName});
   console.log('TEST: ', test);

   const items = await Item.find({test: test._id});
   const sections = await Section.find({test: test._id});
   const numberOfSections = sections.length;
   let questionsResponse = [];
   for(let i=0 ; i<numberOfSections; i++) 
   {
      let sectionQuestions = items.filter(item => item.sectionId === i);
      sectionQuestions.sort(function(a,b){
        return a.id > b.id ? 1: -1;
      });
      questionsResponse.push(sectionQuestions);
   }
    
    //create a new task

    const task = new Task({
      test: test._id
    });
    await task.save();
   
   //create a new session and associate a task to it
    const session = new Session({
      user: userId,
      task: task
    });
    await session.save();

    //assign the session to the user
    const user = await User.findById(userId);
    user.sessions.push(session);
    await user.save();

   //return the session ID from here
   res.status(200).json({
    questionsResponse: questionsResponse,
    sessionId: session._id,
    taskId: task._id
   });
}

exports.post_options_answers = async (req,res) => {
  console.log("Inside questionsAnswerStore route");
 
  let userId = req.body.userId;
  let sectionId = req.body.sectionId;
  let questionId = req.body.questionId;
  let sessionId = req.body.sessionId;
  let taskId = req.body.taskId;
  let answer = req.body.answer;
  let answers=[];
  answer.forEach((element) => {
    if(element['selected'] === true) {
      answers.push(element.option);
    }
  });

  // console.log('TaskId', taskId);
  const task = await Task.findById(taskId);

 //check the answer database for the sectionId  questionId  taskId  sessionId
 const section = await Section.findOne({test: task.test, sectionId: Number.parseInt(sectionId)}).populate('items');
 const item = section.items.find(item => item.id === Number.parseInt(questionId));
 // console.log(item);

 console.log('Correct: ', item.correctAnswer.trim());
 const session = await Session.findById(sessionId);
 // const task = await Task.findById(taskId);
 const correctAnswers = item.correctAnswer.trim().split(',');

 console.log('User Provided answer', answers);
 console.log('Correct answers', correctAnswers);
 console.log('CorrectAnswer', item.correctAnswer);
 let pass = true;

 if(correctAnswers.length !== answers.length)
 {
    pass = false;
    console.log('here is the issue');

 } else {
    for(let i =0; i<correctAnswers.length; i++) {
      console.log(answers);
      console.log(correctAnswers[i]);
      if(!answers.includes(correctAnswers[i])){
        pass = false;
        console.log('here is the problem');
        break;
      }
    }
 }
 const answerFromDB = await Answer.findOne({section: section, item: item, session: session, task: task});
 if(!answerFromDB){
   const answerObject = {
      answers: answers,
      section: section._id,
      item: item._id,
      session: session._id,
      task: task._id,
      pass: pass
    };
    Answer.create(answerObject)
    .then(answer => console.log('SUCCESS ANSWER STORED'))
    .catch(err => console.log('ANSWER NOT STORED. ERROR: ' + err));

 } else {
    console.log('answer present');
    await Answer.findOneAndUpdate({section: section._id, item: item._id, session: session._id, task: task._id}, { $set: {answers: answers, pass: pass} });
 }
 res.status(200).json({msg: `Answer posted for section ${sectionId} and question ${questionId}`});

}

exports.post_hotspot_answers = async (req,res) => {
    console.log("Inside questionResponseStore route");
    console.log(req.body);
    let userId = req.body.userId;
    let sectionId = req.body.sectionId;
    let questionId = req.body.questionId;
    let sessionId = req.body.sessionId;
    let taskId = req.body.taskId;
    let answer = req.body.response;
    
}
exports.post_essay_answers = async (req,res) => {
    console.log("Inside questionResponseStore route");
    console.log(req.body);
  
    let userId = req.body.userId;
    let sectionId = req.body.sectionId;
    let questionId = req.body.questionId;
    let sessionId = req.body.sessionId;
    let taskId = req.body.taskId;
    let answer = req.body.response;

    let answers = [];
    answers.push(answer.answer);
    // console.log(answer.answer);
    const task = await Task.findById(taskId);
    const section = await Section.findOne({test: task.test, sectionId: Number.parseInt(sectionId)}).populate('items');
    const item = section.items.find(item => item.id === Number.parseInt(questionId));
    const session = await Session.findById(sessionId);
    
    const answerFromDB = await Answer.findOne({section: section, item: item, session: session, task: task});
    const correctAnswers = item.correctAnswer.trim().split(',');
    // console.log(correctAnswers);
    let pass = true;
    if(correctAnswers.length !== answers.length){
      pass = false; 
     }
     else
     {
        for(let i =0; i<correctAnswers.length; i++) {
          if(!answers.includes(correctAnswers[i])){
            pass = false;
            break;
          }
        }
     }     
   if(!answerFromDB) {
     const answerObject = {
        answers: answers,
        section: section._id,
        item: item._id,
        session: session._id,
        task: task._id,
        pass:pass
      };
      Answer.create(answerObject)
        .then(answer => console.log('SUCCESS ANSWER STORED'))
        .catch(err => console.log('ANSWER NOT STORED. ERROR: ' + err));
    } else {
        console.log('answer present');
        await Answer.findOneAndUpdate({section: section._id, item: item._id, session: session._id, task: task._id}, { $set: {answers: answers, pass: pass} });
    }
     res.status(200).json({msg: `Answer posted for section ${sectionId} and question ${questionId}`});

}

exports.submit_section = async (req,res) => {
    console.log("Inside submit section route");
    console.log(req.body);
    let userId = req.body.userId;
    let sectionId = req.body.sectionId;
    let timeLeft = req.body.timeLeft;
    const section = await Section.findOne({sectionId: sectionId});
    section.user = userId;
    await section.save();
    res.status(200).json({msg: 'Submit data received: userId, sectionId, timeLeft'});
}



exports.finish_test = async (req,res) => {
  console.log("Inside finishTest route");
  console.log(req.body);
  const {userId,sessionId} = req.body;
  
  //calculate and save the student test results 
  const session = await Session.findById(sessionId).populate('user');
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
  console.log('reportingData');
  console.log(reportingData);
  
  task.score = reportingData['testScore'];
  task.testResult = reportingData['testResult'];
  task.save()
    .then(task => console.log('Task Successfully saved'))
    .catch(error => console.log('ERROR in saving task with updated score and result'));

  const dbResultSave = {
    ...reportingData,
    session : session._id,
    testDate: task.date,
    user: session.user.name
  };

  console.log('dbResultSave');
  console.log(dbResultSave);

  const answerReport = new StudentReport(dbResultSave);

  answerReport.save()
    .then(report => {console.log('answer report Successfully saved'); console.log(report);})
    .catch(err => console.log('Error in saving the answer report ' + err))

  
  // answerResponse['reportingData'] = reportingData;
  console.log(userId + "has finished the test"); 
  res.status(200).json({
      url: 'http://usc-taf-student-reporting.s3-website-us-west-1.amazonaws.com?results=$' + sessionId,
      pass: reportingData['testResult'],
      score: reportingData['testScore']
  });
}

exports.update_test = async () => {
  const reports = await StudentReport.find();
  for(let i = 0; i < reports.length; i++) {
    await populate_test(reports[i].session);
  }
}

const populate_test = async (sessionId) => {
  console.log("Inside populate test route");
  
  //calculate and save the student test results 
  const session = await Session.findById(sessionId).populate('user');
  const task = await Task.findById(session.task).populate('test');
  // console.log(task);
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
  // console.log('reportingData');
  // console.log(reportingData);
  
  // task.score = reportingData['testScore'];
  // task.testResult = reportingData['testResult'];
  // task.save()
  //   .then(task => console.log('Task Successfully saved'))
  //   .catch(error => console.log('ERROR in saving task with updated score and result'));

  const dbResultSave = {
    ...reportingData,
    session : session._id,
    testDate: task.date,
    user: session.user.name
  };

  // console.log('dbResultSave');
  // console.log(dbResultSave);

  console.log(dbResultSave);
  StudentReport.findOneAndUpdate({session: sessionId}, {$set: dbResultSave},
    { new: true, overwrite: true })
      .then(report => {console.log('answer report Successfully updated'); console.log(report);})
    .catch(err => console.log('Error in updating the answer report ' + err))

  
  // answerResponse['reportingData'] = reportingData;
}
