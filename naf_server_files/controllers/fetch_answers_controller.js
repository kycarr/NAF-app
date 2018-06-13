const mongoose = require ('mongoose');
const PORT = process.env.PORT || 8888;

//loading Models
const User = require('../models/User');
const Answer = require('../models/Answer');
const Session = require('../models/Session');
const Module = require('../models/Module');
const Test = require('../models/Test');
const Section = require('../models/Section');
const Item = require('../models/Item');



exports.fetchStudentAnswers = async (req,res) => {
    const items = await Item.find();
      const answerResponse = {};
      for(let i=0; i<items.length;i++) {

       const currentItem = items[i];
        let currentAnswer = await Answer.find({item: currentItem._id});
        
       if(currentAnswer === undefined || currentAnswer.length === 0) {
          console.log('no answer provided');
          currentAnswer ='' ;
        } else {
          currentAnswer = currentAnswer[0].answers;
        }
       let type = currentItem.type;
       if(type == "Multiple_choice") {
        type = currentItem.choiceType;
       }
       let correctAnswer = currentItem.correctAnswer;
        answerResponse[i] = [currentAnswer, correctAnswer, type];
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