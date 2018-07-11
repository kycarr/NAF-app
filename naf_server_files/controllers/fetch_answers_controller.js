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


exports.fetchStudentAnswers = async (req,res) => {

      console.log('Inside the student fetch answers route');
      const sessionId = mongoose.Types.ObjectId(req.query['sessionId']);
      const session = await Session.findById(sessionId);
      console.log(sessionId);
      const task = await Task.findById(session.task);

      let answersList = await Answer.find({session: sessionId, task: session.task});
      
      const items = await Item.find({test: task.test});
      
      const answerResponse = {};
      for(let i=0; i<items.length;i++) {
          
          const currentItem = items[i];
          const topic = await Topic.findOne({id: currentItem.topicId});
          
          let currentAnswer = answersList.filter(element => element.item.toString() === currentItem._id.toString());
          let pass = false;
          console.log('CurrentAnswer', currentAnswer);

          if(currentAnswer === undefined || currentAnswer.length === 0) {
              console.log('no answer provided');
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
          answerResponse[i] = object;
      }
      console.log(answerResponse);
      res.json(answerResponse);
}
/*


  var user = mongoose.Types.ObjectId(req.query['user_id']);
  console.log(user);
    var answerResponse = {};
    console.log(user_id); 
    var item_ids = await Section.find({ 'user': user });
    console.log(items_ids);
    for(let k = 0; k < item_ids.length; k++) {
        let item_id_list = item_ids[k];
        for(let j = 0; j < item_id_list.length; j++) {
            console.log(item_id_list[j]);
                let currentAnswer = await Answer.find({item: item_id_list[j].item_id});
                
               if(currentAnswer === undefined || currentAnswer.length === 0) {
                  console.log('no answer provided');
                  currentAnswer ='' ;
                } else {
                  currentAnswer = currentAnswer[0].answers;
                }

               let correctAnswer = currentItem.correctAnswer;
               answerResponse[j] = [currentAnswer, correctAnswer];
        }
    }
  console.log(answerResponse);
  res.json(answerResponse);

 */