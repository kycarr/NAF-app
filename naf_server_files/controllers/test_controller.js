
const PORT = process.env.PORT || 8888;

//loading Models
const User = require('../models/User');
const Answer = require('../models/Answer');
const Session = require('../models/Session');
const Module = require('../models/Module');
const Test = require('../models/Test');
const Section = require('../models/Section');
const Item = require('../models/Item');


//loading qArray
const qArray = require('../questions');

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

    if(!user) {
      res.status(404).json({error: 'User not found'});
    }

    console.log(user);


    res.status(200).json({
      id: user._id,
      firstname: "Anirudh",
      lastname: "Mittal",
      username: req.body.username
    });
}

exports.get_questions_for_test = async (req,res) => {
    console.log("Inside questions route");
    console.log(req.body);
    let userId = req.body.userId;

   let questionsResponse = [];

   const items = await Item.find();
   let sectionOneQuestions = items.filter(item => item.sectionId === 0);
   let sectionTwoQuestions = items.filter(item => item.sectionId === 1);
   sectionOneQuestions.sort(function (a, b) {
      return a.id > b.id ? 1 : -1;
   });
    sectionTwoQuestions.sort(function (a, b) {
      return a.id > b.id ? 1 : -1;
   })
   questionsResponse.push(sectionOneQuestions);
   questionsResponse.push(sectionTwoQuestions);
   console.log(questionsResponse);
   res.json(questionsResponse);
}

exports.post_options_answers = async (req,res) => {

 console.log("Inside questionsAnswerStore route");
  console.log(req.body);
  let userId = req.body.userId;
  let sectionId = req.body.sectionId;
  let questionId = req.body.questionId;
  let answer = req.body.answer;

  console.log(userId)
  console.log(sectionId)
  console.log(questionId)
  console.log(answer)

 // extract the answer
  let answers=[];
  answer.forEach((element) => {
    if(element['selected'] === true) {
      answers.push(element.option);
    }
  });

  console.log( answers );

 // //check the answer database for the sectionId and questionId

 const section = await Section.findOne({sectionId: Number.parseInt(sectionId)}).populate('items');
 const item = section.items.find(item => item.id === Number.parseInt(questionId));

 const answerFromDB = await Answer.findOne({section: section, item: item});

 console.log(answerFromDB);

 if(!answerFromDB){

   const answerObject = {
      answers: answers,
      section: section._id,
      item: item._id
    };
    Answer.create(answerObject)
    .then(answer => console.log('SUCCESS ANSWER STORED'))
    .catch(err => console.log('ANSWER NOT STORED. ERROR: ' + err));

 } else {
    console.log('answer present');
    await Answer.findOneAndUpdate({section: section._id, item: item._id}, { $set: {answers: answers} });

 }

 res.status(200).json({msg: `Answer posted for section ${sectionId} and question ${questionId}`});

}

exports.post_essay_answers = async (req,res) => {
    console.log("Inside questionResponseStore route");
    console.log(req.body);
  
    let userId = req.body.userId;
    let sectionId = req.body.sectionId;
    let questionId = req.body.questionId;
    let answer = req.body.response;
  
   console.log(answer.answer);
    let answers = [];
    answers.push(answer.answer);


   const section = await Section.findOne({sectionId: Number.parseInt(sectionId)}).populate('items');
    const item = section.items.find(item => item.id === Number.parseInt(questionId));

   const answerFromDB = await Answer.findOne({section: section, item: item});

   if(!answerFromDB) {

     const answerObject = {
        answers: answers,
        section: section._id,
        item: item._id
      };

      Answer.create(answerObject)
        .then(answer => console.log('SUCCESS ANSWER STORED'))
        .catch(err => console.log('ANSWER NOT STORED. ERROR: ' + err));
    } else {

        console.log('answer present');
          await Answer.findOneAndUpdate({section: section._id, item: item._id}, { $set: {answers: answers} });
    }

 
}

exports.submit_section = async (req,res) => {

    console.log("Inside submit section route");
    console.log(req.body);
    let userId = req.body.userId;
    let sectionId = req.body.sectionId;
    let timeLeft = req.body.timeLeft;
    console.log('Submit data');
    console.log("userID: " + userId);
    console.log("sectionId: " + sectionId);
    console.log("time left: " + timeLeft);


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
