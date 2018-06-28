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
      firstname: "Test",
      lastname: "User",
      username: req.body.username,
      loginFailed: false
    });
}

exports.get_questions_for_test = async (req,res) => {
   console.log("Inside questions route");
   console.log(req.body);
   let userId = req.body.userId;
   const items = await Item.find();
   const sections = await Section.find();
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
    const test = await Test.findOne({testName: "Test One"});
    console.log('TEST: ', test);
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

 //check the answer database for the sectionId  questionId  taskId  sessionId
 const section = await Section.findOne({sectionId: Number.parseInt(sectionId)}).populate('items');
 const item = section.items.find(item => item.id === Number.parseInt(questionId));
 console.log('Correct: ', item.correctAnswer.trim());
 const session = await Session.findById(sessionId);
 const task = await Task.findById(taskId);
 const correctAnswers = item.correctAnswer.trim().split(',');
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

    const section = await Section.findOne({sectionId: Number.parseInt(sectionId)}).populate('items');
    const item = section.items.find(item => item.id === Number.parseInt(questionId));
    const session = await Session.findById(sessionId);
    const task = await Task.findById(taskId);
    const answerFromDB = await Answer.findOne({section: section, item: item, session: session, task: task});
    const correctAnswers = item.correctAnswer.trim().split(',');
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
  let userId = req.body.userId;
  console.log(userId + "has finished the test"); 
  res.status(200).end('Success Finish');
}
