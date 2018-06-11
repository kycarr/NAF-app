const mongoose = require ('mongoose');
const async = require('async');
var item = require('../models/item');
var section = require('../models/section');
exports.fetchStudentAnswers = async (req,res) => {
	var user_id = req.query['user_id'];
  	var answerResponse = {};
  	console.log(user_id);
	const item_ids = await section.find({ 'userId': user_id }, {'items': 1});
	console.log(items_ids);
	for(let k = 0; k < item_ids.length; k++) {
		let item_id_list = item_ids[k];
		for(let j = 0; j < item_id_list.length; j++) {
			console.log(item_id_list[j]);
		    	let currentAnswer = await Answer.find({item: item_id_list[j]._id});
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
}

exports.fetchTest = async (req,res) =>{
	console.log("test");
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

	   let correctAnswer = currentItem.correctAnswer;
	    answerResponse[i] = [currentAnswer, correctAnswer];
	  }
	  console.log(answerResponse);
	  res.json(answerResponse);
}

/*
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

   let correctAnswer = currentItem.correctAnswer;
    answerResponse[i] = [currentAnswer, correctAnswer];
  }
  console.log(answerResponse);
  res.json(answerResponse);

console.log(element);
			 	let correctAnswer = item.find( {items_id: element.question_id}, function(err, result) {
					if(err){
						console.log("err" + err);
						return null;
					}
					else if(!result) {
						console.log("question_id answer not found");
						return null;
					}
					else {
						return result;
					}
				});
				let answer = element.answer;
				//response also counts need to work on that
				    function(callback) {
				    	console.log("fuk=asdfasdf");
				        callback(null, 'one', 'two');
				    },
				    function(arg1, arg2, callback) {
				    	console.log("arg1");
						var temp = [];
				    	var promises = result.map( element => {
							var promise = element.items.map( ele => {
								item.find({ '_id': ele }, (err, res2) => {
									if(err){
										console.log("err" + err);
										return null;
									}
									else if(!res2) {
										return null;
									}
									else {
										temp.push(res2);
										// console.log("temp" + temp);
									}
								})
								.then(() => {
									console.log("?????" + temp);
								});
							})
							Promise.all([promises, promise]).then( (result)=> {
								store.push(temp);
								console.log("!!!!!!!" + store);
							});

						});
					Promise.all([promises]).then(callback(null, temp, 'three'));
					console.log(store);
				    },
				    function(arg1, arg2, callback){
				    	console.log("arg1");
				    	res.json(store);
				    	callback(null,"done");
				    }
				
*/
