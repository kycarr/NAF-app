var express = require('express');
const router = express.Router();
var instructorController = require('../controllers/instructorController');
var testResultController = require('../controllers/testResultController');
var classTestLogController = require('../controllers/classTestLogController');
var studentAnswersController = require('../controllers/studentAnswersController');

const PORT = process.env.PORT || 8080;

router.get("/",(req,res)=>{
    res.send(`Server started on port ${PORT}`);
});

router.post('/api/login', (req,res)=>{
});

router.post('/api/questions', (req,res)=>{
    
    let userId = req.query.userId;
    //will need to fetch questions based on user Id
    res.json(qArray);
});

// router.get('/report/getInstructorInfo', instructorController.instructor_info);

// router.post('/report/createInstructor', instructorController.create_instructor);

// router.get('/report/fetchTestResult', testResultController.fetchTestResult);

// router.post('/report/createTestResult', testResultController.createTestResult);

// router.get('/report/fetchClassTestLog', classTestLogController.fetchClassTestLog);

// router.post('/report/createClassTestLog', classTestLogController.createClassTestLog);

router.get('/student/fetchStudentAnswers', studentAnswersController.fetchStudentAnswers);

// router.get('/student/fetchStudentAnswers',  function (req, res) {
//   try {
// 	var user_id = req.query['user_id'];
//   	var answerResponse = {};
//   	console.log(user_id);
// 	const item_ids = await section.find({ 'userId': user_id }, {'items': 1});
// 	console.log(items_ids);
// 	for(let k = 0; k < item_ids.length; k++) {
// 		let item_id_list = item_ids[k];
// 		for(let j = 0; j < item_id_list.length; j++) {
// 			console.log(item_id_list[j]);
// 		    	let currentAnswer = await Answer.find({item: item_id_list[j]});
			    
// 			   if(currentAnswer === undefined || currentAnswer.length === 0) {
// 			      console.log('no answer provided');
// 			      currentAnswer ='' ;
// 			    } else {
// 			      currentAnswer = currentAnswer[0].answers;
// 			    }

// 			   let correctAnswer = currentItem.correctAnswer;
// 			    answerResponse[j] = [currentAnswer, correctAnswer];
// 		}
// 	}
//   	console.log(answerResponse);
//   	res.json(answerResponse);
//   } catch (e) {
//     //this will eventually be handled by your error handling middleware
//     next(e) 
//   }
// });

router.get('/student/fetchStudentAnswers', studentAnswersController.fetchTest);
module.exports=router;