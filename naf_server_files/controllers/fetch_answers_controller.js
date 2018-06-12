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
    var user = mongoose.Types.ObjectId(req.query['user_id']);
    console.log(user); 
    const items_list = await Section.find({user: user}, {items: 1});
    let items = [];
    for(let j = 0; j < items_list.length; j++) {
      let items_id = items_list[j].items;
      for(let k = 0; k < items_id.length; k++) {
          const item = await Item.findOne({'_id': items_id[k]});
          console.log(item);
          items.push(item);
      }
    }
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

       let correctAnswer = currentItem.correctAnswer;
        answerResponse[i] = [currentAnswer, correctAnswer];
      }
      console.log(answerResponse);
      res.json(answerResponse);
}